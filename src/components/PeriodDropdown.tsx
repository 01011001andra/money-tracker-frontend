import * as React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@iconify/react";

export type PeriodKey = "today" | "thisWeek" | "thisMonth" | "thisYear";

const LABELS: Record<PeriodKey, string> = {
  today: "Hari ini",
  thisWeek: "Minggu ini",
  thisMonth: "Bulan ini",
  thisYear: "Tahun ini",
};

type PeriodDropdownProps = {
  value: PeriodKey;
  onChange: (v: PeriodKey) => void;
};

export default function PeriodDropdown({
  value,
  onChange,
}: PeriodDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSelect = (v: PeriodKey) => {
    onChange(v);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size="small"
        variant="text"
        disableRipple
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<Icon icon="mdi:chevron-down" width={18} height={18} />}
        sx={{
          px: 0,
          minWidth: 0,
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { backgroundColor: "transparent", color: "text.primary" },
        }}
      >
        {LABELS[value]}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180, py: 0.5 } }}
      >
        {(
          [
            { key: "today", icon: "mdi:calendar-today" },
            { key: "thisWeek", icon: "mdi:calendar-week" },
            { key: "thisMonth", icon: "mdi:calendar-month" },
            { key: "thisYear", icon: "mdi:calendar" },
          ] as { key: PeriodKey; icon: string }[]
        ).map(({ key, icon }) => (
          <MenuItem
            key={key}
            selected={value === key}
            onClick={() => handleSelect(key)}
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <Icon icon={icon} width={18} height={18} />
            </ListItemIcon>
            <ListItemText>{LABELS[key]}</ListItemText>
            {value === key && <Icon icon="mdi:check" width={18} height={18} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
