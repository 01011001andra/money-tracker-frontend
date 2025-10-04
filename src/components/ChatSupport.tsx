import useRouter from "@/hooks/apps/useRouter";
import type { SheetScreenProps } from "@/providers/Sheets/Registry";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  IconButton,
  Badge,
  Paper,
  InputBase,
  Chip,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useUserStore } from "@/stores/user";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import type { UseMutationResult } from "@tanstack/react-query";
import type { MessagesType, SendMessageType } from "@/types/apps/chat";
import { useMessageStore } from "@/stores/message";
import { fileToBlobUrl } from "@/utils/helper/helper";
import ImageChat from "./ImageChat";

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
async function sendMessage(
  userId: string,
  message: string,
  mutation: UseMutationResult<string, unknown, SendMessageType, unknown>,
  image?: File | Blob
): Promise<MessagesType | undefined> {
  try {
    const payload = { message: message, userId, image: image };
    const result = await mutation.mutateAsync(payload);
    const assistantMsg: MessagesType = {
      id: crypto.randomUUID(),
      role: "assistant",
      message: result,
      createdAt: new Date(Date.now() + 500).toISOString(),
    };
    return assistantMsg;
  } catch (error) {
    console.log(error);
  }
}

// ====== Komponen gelembung pesan ======
function MessageBubble({ m, mine }: { m: MessagesType; mine: boolean }) {
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
          {m.image ? (
            <img
              src={`${m.image}`}
              alt="Image"
              className="size-96 object-contain"
            />
          ) : (
            <div className="break-words">{m.message}</div>
          )}
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
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages: messageStore, addMessage: addMessageStore } =
    useMessageStore();
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const userId = user?.id || "";
  const mutation = useSendMessage();
  const isTextEmpty = !text.trim();
  // ===== State Modal Info Bot =====
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [infoOpen, setInfoOpen] = useState(false);
  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);

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
        setMessages(messageStore);
      } finally {
        setLoading(false);
        setTimeout(autoScroll, 50);
      }
    })();
  }, [userId, autoScroll]);

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
    { label: "Pemasukan", value: "/pemasukan " },
    { label: "Pengeluaran", value: "/pengeluaran " },
    { label: "Catat Transaksi", value: "/catat " },
  ];

  const onQuick = (val: string) => setText(val);

  const onSend = async (image?: File | Blob) => {
    if (!image) {
      const content = text.trim();
      if (!content || sending) return;
    }
    setSending(true);
    setTyping(true);

    const now = new Date().toISOString();

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        message: text,
        createdAt: now,
        image: image ? fileToBlobUrl(image).url : null,
      },
    ]);
    setText("");
    addMessageStore({
      id: crypto.randomUUID(),
      role: "user",
      message: text,
      createdAt: now,
    });

    // fokus kembali ke input setelah kirim
    requestAnimationFrame(() => inputRef.current?.focus());

    try {
      const batch = await sendMessage(userId, text, mutation, image);
      if (batch) {
        setMessages((prev) => [...prev, batch]);
        addMessageStore(batch);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          message: "Gagal mengirim pesan. Coba lagi.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
      setTyping(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleGallery = (file: File) => {
    onSend(file);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2 border-b border-gray-200 bg-white">
        <IconButton aria-label="Back" onClick={handleBack} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>

        <StyledBadge
          className="mr-2 bg-gray-100 p-2 rounded-full"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Icon icon="bxs:bot" className="size-8 text-primary cursor-pointer" />
        </StyledBadge>

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base text-primary">
              Muscash Bot
            </span>
            <span className="text-xs text-black">Online</span>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="Info Bot">
              <IconButton
                aria-label="Info Bot"
                size="small"
                onMouseDown={(e) => e.preventDefault()} // cegah blur input
                onTouchStart={(e) => e.preventDefault()} // cegah blur input
                onClick={openInfo}
              >
                <Icon
                  icon="material-symbols:info-rounded"
                  className="size-7 text-primary cursor-pointer"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Box>

      {/* Quick Actions */}
      <Box className="px-3 py-2 border-b border-gray-200 bg-white/70">
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
      <Box
        className={`pb-2.5 pt-1 px-3 flex items-center justify-center gap-2`}
      >
        <Paper
          elevation={0}
          className="w-full rounded-full px-2 py-1.5 flex items-center gap-1 bg-white border border-gray-200 relative"
        >
          <InputBase
            inputRef={inputRef}
            autoFocus
            multiline
            maxRows={4}
            className="flex-1 px-2 text-sm overflow-y-auto max-h-10"
            placeholder="Tulis pesan...."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
          />
          {/* 
          <label htmlFor="gallery">
            <input
              type="file"
              id="gallery"
              className="hidden"
              onChange={handleGallery}
            />
            <Tooltip
              title="Lampirkan"
              className="text-gray-400"
              // onClick={() => {
              //   alert("Coming soon!!");
              // }}
            >
              <Icon icon="basil:camera-solid" className="size-7" />
            </Tooltip>
          </label> */}
          {isTextEmpty && (
            <div className="mb-5 relative">
              <ImageChat onGallery={(file) => handleGallery(file)} />
            </div>
          )}
        </Paper>
        <Tooltip
          title="Kirim"
          className={`${
            isTextEmpty ? "bg-gray-400" : " bg-primary"
          } text-white p-2`}
        >
          <IconButton
            size="small"
            color="primary"
            className="shrink-0"
            onClick={() => {
              onSend();
            }}
            disabled={isTextEmpty}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
          >
            <Icon icon="tabler:send" className="size-5" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Modal Info Bot */}
      <Dialog
        open={infoOpen}
        onClose={closeInfo}
        fullScreen={fullScreen}
        aria-labelledby="bot-info-title"
        disableEnforceFocus
        keepMounted
      >
        <DialogTitle id="bot-info-title" className="text-primary font-bold">
          Tentang Muscash Bot
        </DialogTitle>

        <DialogContent dividers className="space-y-3">
          <div className="text-sm text-gray-800">
            <p className="mb-2">
              Muscash Bot membantu kamu mencatat transaksi dan melihat ringkasan
              keuangan lewat perintah singkat.
            </p>

            <Divider className="my-2" />

            <p className="font-semibold">Contoh perintah:</p>
            <ul className="list-disc ml-5 mt-1">
              <li>
                <code>/catat beli jus apel 20rb</code>
              </li>
              <li>
                <code>/pengeluaran 24 Mei 2025</code>
              </li>
              <li>
                <code>/pemasukan 24 Mei 2025</code>
              </li>
            </ul>

            <Divider className="my-2" />

            <p className="text-xs text-gray-600 leading-relaxed">
              <b>Catatan:</b> Anda sedang berinteraksi dengan asisten otomatis.
              Sesi percakapan ini bersifat sementara dan tidak disimpan; seluruh
              pesan akan terhapus saat aplikasi dimulai ulang.
            </p>
          </div>
        </DialogContent>

        <DialogActions className="px-4 py-2">
          <Button onClick={closeInfo} variant="contained" color="primary">
            Mengerti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatSupport;
