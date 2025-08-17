// components/TransactionDetailsDrawer.tsx
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { formatIDR } from "@/utils/helper/helper";
import type { TransactionItem } from "./TransactionList";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  item?: TransactionItem | null;
};

export default function TransactionDetailsDrawer({
  open,
  onOpen,
  onClose,
  item,
}: Props) {
  // Bar kecil penanda bisa di-swipe
  const Puller = () => (
    <Box
      sx={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 40,
        height: 4,
        borderRadius: 999,
        bgcolor: "text.disabled",
        opacity: 0.5,
      }}
    />
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      swipeAreaWidth={18}
      disableSwipeToOpen={false}
      PaperProps={{
        sx: {
          height: "65vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "visible",
        },
      }}
    >
      <Box sx={{ position: "relative", p: 2 }}>
        <Puller />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="subtitle1" fontWeight={800}>
            {item?.title ?? "-"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Icon icon="mdi:close" width={20} height={20} />
          </IconButton>
        </Box>
        <Divider />

        {/* Content */}
        <Box sx={{ mt: 2, display: "grid", gap: 1.5 }}>
          <Typography
            variant="h5"
            fontWeight={900}
            color={item && item.amount >= 0 ? "success.main" : "error.main"}
          >
            {item ? formatIDR(item.amount) : "-"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, color: "text.secondary" }}>
            <Box
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
            >
              <Icon icon="solar:folder-2-outline" width={18} height={18} />
              <span>{item?.category ?? "-"}</span>
            </Box>
            <Box
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
            >
              <Icon icon="solar:calendar-linear" width={18} height={18} />
              <span>{item?.date ?? "-"}</span>
            </Box>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {item?.note ?? "-"}
            </Typography>
          </Box>

          {/* Aksi cepat */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 2,
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <IconButton color="primary">
              <Icon icon="mdi:pencil" width={20} height={20} />
            </IconButton>
            <IconButton color="error">
              <Icon icon="mdi:trash-can-outline" width={20} height={20} />
            </IconButton>
            <IconButton>
              <Icon icon="mdi:share-variant" width={20} height={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
