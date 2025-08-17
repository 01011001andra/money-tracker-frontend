import type { SheetScreenProps } from "@/providers/Sheets/Registry";

const ChangePassword: React.FC<SheetScreenProps> = ({
  closeSelf,
  openSheet,
}) => (
  <div className="w-full h-full flex flex-col">
    <header className="p-4 font-bold">Profile</header>
    <div className="p-4 flex-1 overflow-auto">…isi profile…</div>
    <div className="p-4 flex gap-2">
      <button
        onClick={() => openSheet("change-password")}
        className="px-3 py-2 bg-black text-white rounded"
      >
        Change Password
      </button>
      <button onClick={closeSelf} className="px-3 py-2 border rounded">
        Close
      </button>
    </div>
  </div>
);

export default ChangePassword;
