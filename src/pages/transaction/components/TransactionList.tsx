import React, { Fragment } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { formatIDR } from "@/utils/helper";

export type TransactionItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number; // + = income, - = expense
  note?: string;
  icon: string;
  iconBg: string; // contoh: "#E0E7FF"
  iconColor: string; // contoh: "#4F46E5"
};

type TransactionListProps = {
  items: TransactionItem[];
  showChevron?: boolean;
  dense?: boolean;
  onItemClick?: (item: TransactionItem) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  items,
  showChevron = true,
  dense = false,
  onItemClick,
}) => {
  return (
    <List sx={{ py: 0 }}>
      {items.map((it, idx) => (
        <Fragment key={it.id}>
          <ListItem
            disableGutters
            className={dense ? "" : "my-1"}
            onClick={() => onItemClick?.(it)}
            sx={{
              px: 1,
              borderRadius: 2,
              cursor: onItemClick ? "pointer" : "default",
              "&:hover": {
                backgroundColor: onItemClick ? "action.hover" : "transparent",
              },
            }}
          >
            <Box className="flex items-center w-full">
              <ListItemAvatar>
                <Avatar
                  variant="circular"
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: it.iconBg,
                    color: it.iconColor,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                  }}
                >
                  <Icon icon={it.icon} width={20} height={20} />
                </Avatar>
              </ListItemAvatar>

              <Box className="flex w-full justify-between items-center">
                <ListItemText
                  sx={{ m: 0 }}
                  primary={
                    <Typography
                      variant="body2"
                      className="text-xs mb-1"
                      fontWeight={600}
                      noWrap
                    >
                      {it.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{
                        fontSize: "0.75rem",
                        color: it.amount >= 0 ? "success.main" : "error.main",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatIDR(it.amount)}
                    </Typography>
                  }
                />
                {showChevron && (
                  <Icon
                    icon="fluent:ios-arrow-right-24-filled"
                    width={14}
                    height={14}
                  />
                )}
              </Box>
            </Box>
          </ListItem>

          {idx < items.length - 1 && (
            <Divider
              component="li"
              variant="inset"
              sx={{ borderColor: "divider" }}
            />
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default TransactionList;
