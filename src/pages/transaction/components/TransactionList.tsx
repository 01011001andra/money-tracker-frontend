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
import useRouter from "@/hooks/apps/useRouter";

type TransactionListProps = {
  showChevron?: boolean;
  dense?: boolean;
  onItemClick?: (item: Transaction) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  showChevron = true,
  dense = false,
  onItemClick,
}) => {
  const router = useRouter();
  const { data } = useGetTransaction();
  const filteredTransaction =
    router.query.tab == "all"
      ? data?.data
      : data?.data.filter(
          (item) => item.type == router.query.tab?.toUpperCase()
        );

  return (
    <List sx={{ py: 0 }}>
      {filteredTransaction?.map((item, idx) => (
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
                    // bgcolor: item.iconBg,
                    // color: item.iconColor,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                  }}
                >
                  {/* <Icon icon={item.icon} width={20} height={20} /> */}
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
                      variant="body2"
                      fontWeight={700}
                      sx={{
                        fontSize: "0.75rem",
                        color: item.amount >= 0 ? "success.main" : "error.main",
                        whiteSpace: "nowrap",
                      }}
                    >
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

          {idx < filteredTransaction.length - 1 && (
            <Divider sx={{ borderColor: "divider", width: "100%" }} />
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default TransactionList;
