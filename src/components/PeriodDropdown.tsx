import * as React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@iconify/react";
import useRouter from "@/hooks/apps/useRouter";

export type PeriodKey = "day" | "week" | "month" | "year";

const LABELS: Record<PeriodKey, string> = {
  day: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
};

export default function PeriodDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const filterQuery = router.query.filter as PeriodKey;

  const handleSelect = (v: PeriodKey) => {
    router.setQuery((prev) => ({ ...prev, filter: v }), { replace: true });
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
        {LABELS[filterQuery]}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180, py: 0.5 } }}
      >
        {(
          [
            { key: "day", icon: "mdi:calendar-today" },
            { key: "week", icon: "mdi:calendar-week" },
            { key: "month", icon: "mdi:calendar-month" },
            { key: "year", icon: "mdi:calendar" },
          ] as { key: PeriodKey; icon: string }[]
        ).map(({ key, icon }) => (
          <MenuItem
            key={key}
            selected={filterQuery === key}
            onClick={() => handleSelect(key)}
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <Icon icon={icon} width={18} height={18} />
            </ListItemIcon>
            <ListItemText>{LABELS[key]}</ListItemText>
            {filterQuery === key && (
              <Icon icon="mdi:check" width={18} height={18} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
