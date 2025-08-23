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
// import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";
import type { Transaction } from "@/types/transaction";
import { useInfiniteTransactions } from "@/hooks/transaction/useGetTransactionInfinity";

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
  // const { data, refetch } = useGetTransaction();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteTransactions({ limit: 5 }); // bisa kirim { year: 2025 }

  // gabungkan semua halaman
  const items = React.useMemo(
    () => data?.pages.flatMap((p) => p.data ?? []) ?? [],
    [data]
  );

  // sentinel untuk infinite scroll
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!loadMoreRef.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    io.observe(loadMoreRef.current);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <div>Loading…</div>;
  return (
    <List sx={{ py: 0 }}>
      {items?.map((item, idx) => (
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
                    bgcolor: item?.icon?.style.backgroundColor,
                    color: item?.icon?.style.color,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                  }}
                >
                  <Icon
                    icon={item?.icon?.name || ""}
                    width={item?.icon?.style.width}
                    height={item?.icon?.style.height}
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

          {idx < items.length - 1 && (
            <Divider sx={{ borderColor: "divider", width: "100%" }} />
          )}
        </Fragment>
      ))}
      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isFetchingNextPage && <div>Loading more…</div>}
      {!hasNextPage && <div className="text-muted">Sudah sampai akhir</div>}
    </List>
  );
};

export default TransactionList;
