import useRouter from "@/hooks/apps/useRouter";
import type { SheetScreenProps } from "@/providers/Sheets/Registry";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  IconButton,
  Badge,
  Avatar,
  Paper,
  InputBase,
  Chip,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";

// ===== Badge Online =====
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));

// ====== (Stub) API: sambungkan ke webhook n8n kamu ======
type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string; // ISO
  meta?: Record<string, any>;
};

async function fetchMessages(roomId: string): Promise<ChatMessage[]> {
  console.log(roomId);
  // Ganti ke webhook GET kamu (mis. /chat/messages?roomId=xxx)
  // return (await fetch(url)).json();
  // Dummy seed:
  return [
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Aku Muscash Bot. Kamu bisa ketik perintah seperti:\n• /catat beli jus apel 20rb\n• /ringkas hari ini\n• /saldo",
      createdAt: new Date(Date.now() - 60_000).toISOString(),
    },
  ];
}

async function sendMessage(
  roomId: string,
  text: string
): Promise<ChatMessage[]> {
  // Ganti ke webhook POST kamu (mis. /chat/message)
  // Body: { roomId, senderId, content }
  // Return array message baru: biasanya 1 user + 1 balasan bot
  // Di sini kita simulasi balasan bot:
  const now = new Date().toISOString();
  const userMsg: ChatMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: text,
    createdAt: now,
  };
  const assistantMsg: ChatMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: `Kamu mengirim: "${text}".\n(Ini dummy balasan — sambungkan ke n8n untuk jawaban asli)`,
    createdAt: new Date(Date.now() + 500).toISOString(),
  };
  // return dari webhook sebaiknya sudah berurutan
  return [userMsg, assistantMsg];
}

// ====== Komponen gelembung pesan ======
function MessageBubble({ m, mine }: { m: ChatMessage; mine: boolean }) {
  const time = useMemo(() => {
    try {
      return new Date(m.createdAt).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, [m.createdAt]);

  return (
    <div className="flex flex-col">
      <div
        className={`w-full flex ${mine ? "justify-end" : "justify-start"} my-1`}
      >
        <div
          className={[
            "max-w-[78%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap",
            mine
              ? "bg-primary text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,.35)]"
              : "bg-white text-gray-900 shadow-[0_10px_20px_-10px_rgba(0,0,0,.25)] dark:bg-semi-dark ",
          ].join(" ")}
        >
          <div className="break-words">{m.content}</div>
        </div>
      </div>
      <div
        className={`my-2 text-[11px] opacity-70 ml-4 text-gray-500 ${
          mine ? "text-end" : "text-start"
        }`}
      >
        {time}
      </div>
    </div>
  );
}

// ====== Indikator bot sedang mengetik ======
function TypingIndicator() {
  return (
    <div className="w-full flex justify-start my-1">
      <div className="bg-white dark:bg-semi-dark rounded-2xl px-3 py-2 shadow-[0_10px_20px_-10px_rgba(0,0,0,.25)]">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
          <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.1s]" />
          <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

const ChatSupport: React.FC<SheetScreenProps> = ({ closeTop }) => {
  const router = useRouter();
  const roomId = String(router.query.id || "room-muscash");
  const listRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  const autoScroll = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const initial = await fetchMessages(roomId);
        setMessages(initial);
      } finally {
        setLoading(false);
        setTimeout(autoScroll, 50);
      }
    })();
  }, [roomId, autoScroll]);

  useEffect(() => {
    autoScroll();
  }, [messages, typing, autoScroll]);

  const handleBack = () => {
    closeTop();
    if (router.query.id && router.query.sheet) {
      router.setQuery({ id: null, sheet: null });
    }
  };

  const quickActions = [
    { label: "Saldo", value: "/saldo" },
    { label: "Ringkas Hari Ini", value: "/ringkas hari ini" },
    { label: "Catat: Jus Apel 20rb", value: "/catat beli jus apel 20rb" },
  ];

  const onQuick = (val: string) => setText(val);

  const onSend = async () => {
    const content = text.trim();
    if (!content || sending) return;
    setSending(true);
    setTyping(true);
    try {
      const batch = await sendMessage(roomId, content);
      setMessages((prev) => [...prev, ...batch]);
      setText("");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Gagal mengirim pesan. Coba lagi.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
      // kasih jeda kecil biar indikator ketik terasa
      setTimeout(() => setTyping(false), 300);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="w-full h-full flex flex-col  ">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2 border-b border-gray-200  bg-white">
        <IconButton aria-label="Back" onClick={handleBack} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>

        <StyledBadge
          className="mr-2"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Mus" src="/static/images/avatar/1.jpg" />
        </StyledBadge>

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base text-primary">
              Muscash Bot
            </span>
            <span className="text-xs text-black dark:text-gray-400">
              Online
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="Info Bot">
              <Icon
                icon="material-symbols:info-rounded"
                className="size-7 text-primary cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>
      </Box>

      {/* Quick Actions */}
      <Box className="px-3 py-2 border-b border-gray-200  bg-white/70 ">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {quickActions.map((q) => (
            <Chip
              key={q.value}
              size="small"
              label={q.label}
              onClick={() => onQuick(q.value)}
              className="cursor-pointer"
              icon={<Icon icon="tabler:bolt" />}
              sx={{ borderRadius: "999px" }}
            />
          ))}
        </div>
      </Box>

      {/* Messages */}
      <Box ref={listRef} className="w-full flex-1 overflow-y-auto px-3 py-3">
        {loading ? (
          <div className="h-full w-full grid place-items-center">
            <div className="flex items-center gap-2 text-black">
              <CircularProgress size={18} />
              <span className="text-sm">Memuat percakapan…</span>
            </div>
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} m={m} mine={m.role === "user"} />
            ))}
            {typing && <TypingIndicator />}
            <div className="h-2" />
          </>
        )}
      </Box>

      {/* Input Bar */}
      <Box className="h-20 px-3 pb-[env(safe-area-inset-bottom)] pt-2 border-t border-gray-200  bg-white ">
        <Paper
          elevation={0}
          className="w-full rounded-full px-2 py-1 flex items-center gap-1 bg-white  border border-gray-200  "
        >
          <Tooltip title="Lampirkan">
            <IconButton size="small" className="shrink-0">
              <Icon icon="tabler:paperclip" width={20} />
            </IconButton>
          </Tooltip>

          <InputBase
            multiline
            maxRows={4}
            className="flex-1 px-2 text-sm overflow-y-auto max-h-10"
            placeholder="Tulis pesan...."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={sending}
          />

          {sending ? (
            <div className="px-2">
              <CircularProgress size={18} />
            </div>
          ) : (
            <>
              <Tooltip title="Kirim">
                <IconButton
                  size="small"
                  color="primary"
                  className="shrink-0"
                  onClick={onSend}
                  disabled={!text.trim()}
                >
                  <Icon icon="tabler:send" width={20} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Paper>

        {/* Hint kecil */}
        <div className="text-[10px] text-black mt-1 px-2">
          Tips: coba ketik{" "}
          <span className="font-mono bg-gray-100 px-1 rounded">
            /catat beli kopi 15rb
          </span>
        </div>
      </Box>
    </div>
  );
};

export default ChatSupport;
