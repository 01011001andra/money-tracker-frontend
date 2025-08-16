// src/pages/Login.tsx
import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useRouter from "@/hooks/apps/useRouter";
import { useLoginMutation } from "@/hooks/auth/useLogin";
// import { useAuthStore } from "@/stores/auth";

const Login: React.FC = () => {
  const mutation = useLoginMutation();

  const router = useRouter();
  const from = router.location.state?.from || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const validate = () => {
    if (!email || !password) return "Email dan password wajib diisi.";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return "Format email tidak valid.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const msg = validate();
    if (msg) return setError(msg);
    setError(null);
    setLoading(true);

    const data = {
      email,
      password,
    };
    try {
      const result = await mutation.mutateAsync(data);
      console.log(result);

      router.replace(from);
    } catch (err: any) {
      setError(err.response.data.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // const handleBack = () => {
  //   // router.back();
  // };

  React.useEffect(() => {
    const remembered = localStorage.getItem("remember_email");
    if (remembered) setEmail(remembered);
  }, []);

  return (
    <div className="min-h-[100dvh] flex justify-center p-4 w-full">
      <div className="flex flex-col w-full">
        <Box
          mb={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* <div
            className=" mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary-600"
            onClick={handleBack}
          >
            <Icon
              icon="weui:back-filled"
              width={20}
              height={20}
              className="text-white"
            />
          </div> */}
          {error && (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          )}
          <Typography variant="h5" fontWeight={800}>
            Log in
          </Typography>
          <form onSubmit={onSubmit} className="space-y-4 w-full" noValidate>
            <div className="space-y-4 w-full">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="Email" className="text-xs text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border text-sm border-gray-200 rounded-full bg-white py-3.5 px-6 focus:border-primary outline-none"
                  placeholder="Email anda"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="Password" className="text-xs text-gray-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="Password"
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border text-sm border-gray-200 rounded-full bg-white py-3.5 px-6 pr-12 focus:border-primary outline-none w-full"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                  >
                    <Icon
                      icon={
                        showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                      }
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    size="small"
                  />
                }
                label={<span className="text-sm">Ingat saya</span>}
              />
              <Link to="/forgot-password" className="text-sm text-primary">
                Lupa password?
              </Link>
            </Box>

            <Button
              type="submit"
              className="bg-primary rounded-3xl"
              variant="contained"
              size="large"
              fullWidth
              disableElevation
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          {/* --- Separator --- */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary">
                Daftar
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider
          textAlign="center"
          sx={{ fontSize: "0.75rem", color: "text.secondary" }}
        >
          Atau
        </Divider>
        <Box
          mb={4}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        ></Box>
        {/* --- Tombol Google --- */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            className="rounded-full border-primary text-primary"
            startIcon={<Icon icon="logos:google-icon" width={18} height={18} />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.25,
            }}
          >
            Lanjut dengan Google
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
