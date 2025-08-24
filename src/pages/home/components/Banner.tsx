import * as React from "react";
import SkeletonLoader from "@/components/SkeletonLoader";
import useRouter from "@/hooks/apps/useRouter";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";
import { Icon } from "@iconify/react";
import { FormControl, MenuItem, Select } from "@mui/material";

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const Banner = () => {
  // hooks
  const router = useRouter();
  const { data, isLoading } = useGetDashboard();
  const [select, setSelect] = React.useState<number>(0);
  const amount = data?.data?.banner?.balances[select].amount || 0;
  const footer = {
    income: data?.data?.banner?.balances[select].totalTransaction.income || 0,
    expense: data?.data?.banner?.balances[select].totalTransaction.expense || 0,
    message: data?.data?.banner?.balances[select].totalTransaction.message,
  };

  const onDetail = () => {
    router.push("/report");
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader type="banner" length={5} />
      ) : (
        <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white shadow-lg ring-1 ring-white/15 bg-[linear-gradient(135deg,var(--color-primary-700)_0%,var(--color-primary-600)_50%,var(--color-primary-800)_100%)] max-h-52 h-full">
          {/* dekorasi: glow & grid halus */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:16px_16px]"
          />

          {/* header */}
          <div className="relative z-10 flex items-center justify-between">
            <FormControl variant="standard" className="w-fit" size="small">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={select}
                defaultValue={select}
                sx={{
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                  "&:before": { borderBottom: "none" },
                  "&:after": { borderBottom: "none" },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiSelect-select": {
                    mt: 0.1, // margin bottom 1 (theme spacing = 8px → 8px)
                  },
                }}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        py: 1,
                        px: 1.5,
                        minHeight: "unset",
                      },
                    },
                  },
                }}
              >
                {data?.data?.banner?.balances?.map((balance, index) => {
                  return (
                    <MenuItem className="text-black " value={index}>
                      <span className="text-xs font-medium/relaxed ">
                        {balance.name}
                      </span>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* <span className="text-xs font-medium/relaxed text-white/90">
              {data?.data?.banner?.title}
            </span> */}

            <button
              onClick={onDetail}
              className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 transition hover:bg-white/15"
            >
              Detail
              <Icon
                icon="iconamoon:arrow-right-2-bold"
                fontSize={16}
                className="transition group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* amount */}
          <div className="relative z-10 mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {formatIDR(amount || 0)}
            </div>
          </div>

          {/* trend */}
          <div className="flex flex-col gap-2">
            <div className="relative z-10 mt-3 inline-flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset
            ${
              footer.income !== 0
                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20"
                : "bg-gray-500/15 text-gray-300 ring-gray-400/20"
            }`}
              >
                <Icon icon={"solar:course-up-bold"} fontSize={14} />
                {footer.income}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset
                ${
                  footer.expense !== 0
                    ? "bg-rose-500/15 text-rose-300 ring-rose-400/20"
                    : "bg-gray-500/15 text-gray-300 ring-gray-400/20"
                }
                `}
              >
                <Icon icon={"solar:course-down-bold"} fontSize={14} />
                {footer.expense}
              </span>
            </div>
          </div>
          <div className="flex items-center mt-3 gap-1">
            <Icon
              icon={footer.message?.icon || "mdi:information-outline"}
              color={footer.message?.color}
              fontSize={24}
            />
            <small className="font-medium flex-1 text-[10px]">
              {footer.message?.text}
            </small>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
