// src/pages/Login.tsx
import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/stores/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
    const msg = validate();
    if (msg) return setError(msg);
    setError(null);
    setLoading(true);

    try {
      // TODO: panggil auth/login kamu di sini
      // const { login } = useAuthStore.getState();
      // await login(email, password);

      // Contoh simulasi sukses:
      await new Promise((r) => setTimeout(r, 600));
      if (remember) localStorage.setItem("remember_email", email);

      // Setelah store isAuthenticated = true, baru redirect:
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const remembered = localStorage.getItem("remember_email");
    if (remembered) setEmail(remembered);
  }, []);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 p-4">
      <Paper
        elevation={8}
        className="w-full max-w-sm rounded-2xl"
        sx={{ p: 3 }}
      >
        <Box mb={2} textAlign="center">
          <div
            className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: "var(--color-primary-50, #eef2ff)" }}
          >
            <Icon
              icon="solar:wallet-money-bold-duotone"
              width={24}
              height={24}
              className="text-primary-600"
            />
          </div>
          <Typography variant="h5" fontWeight={800}>
            Masuk
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gunakan email dan password Anda
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:email-outline" width={18} height={18} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:lock-outline" width={18} height={18} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    <Icon
                      icon={
                        showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                      }
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  size="small"
                />
              }
              label={<span className="text-sm">Ingat saya</span>}
            />
            <Link to="/forgot-password" className="text-sm text-blue-600">
              Lupa password?
            </Link>
          </Box>

          <Button
            type="submit"
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

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600">
              Daftar
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
