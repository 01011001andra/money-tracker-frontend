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
import { formatIDR } from "@/utils/helper/helper";
import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";
import type { Transaction } from "@/types/transaction";

type TransactionListProps = {
  showChevron?: boolean;
  dense?: boolean;
  onItemClick?: (item: Transaction) => void;
  page: number;
};

const TransactionList: React.FC<TransactionListProps> = ({
  showChevron = true,
  dense = false,
  onItemClick,
  page,
}) => {
  const { data } = useGetTransaction(null, {
    page: String(page),
  });
  const list = (data?.data as Transaction[]) ?? [];

  return (
    <List sx={{ py: 0 }}>
      {list?.map((item, idx) => (
        <Fragment key={item.id}>
          <ListItem
            disableGutters
            className={dense ? "" : "my-1"}
            onClick={() => onItemClick?.(item)}
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
                    bgcolor: item.icon?.style.backgroundColor,
                    color: item.icon?.style.color,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                  }}
                >
                  <Icon
                    icon={item.icon?.name || ""}
                    width={item.icon?.style.width}
                    height={item.icon?.style.height}
                  />
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
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      className="text-xs mt-1"
                      variant="body2"
                      fontWeight={700}
                      sx={{
                        color:
                          item.type == "INCOME" ? "success.main" : "error.main",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.type == "EXPENSE" && "- "} Rp.
                      {formatIDR(item.amount)}
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

          {idx < list.length - 1 && (
            <Divider sx={{ borderColor: "divider", width: "100%" }} />
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default TransactionList;
