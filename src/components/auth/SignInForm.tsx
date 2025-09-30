import Swal from "sweetalert2";
import { useState } from "react";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { useDispatch } from "react-redux";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { signin } from "../../services/authentication/authService";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const signinPayload = {
        email: email,
        password: password
      }
      const result = await signin(signinPayload);

      if (
        result &&
        typeof result === "object" &&
        "user" in result &&
        "token" in result
      ) {
        dispatch(loginSuccess(result));
        navigate("/home");
      } else if (result === "UNAUTHORIZED") {
        Swal.fire({
          title: "Uğursuz cəhd!",
          text: "İstifadəçi məlumatlarınızın doğruluğundan əmin olun!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        }).finally(() => {
          setLoading(false);
        })
      } else {
        Swal.fire({
          title: "Uğursuz cəhd!",
          text: "Server xətası!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        }).finally(() => {
          setLoading(false);
        })
      }
    } catch (err) {
      Swal.fire({
        title: "Uğursuz cəhd!",
        text: "Server xətası!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      }).finally(() => {
        setLoading(false);
      })
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Daxil ol
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Daxil olmaq üçün e-poçt adresini və şifrənizi daxil edin!
          </p>
        </div>
        <form onSubmit={handleSignin}>
          <div className="space-y-6">
            <div>
              <Label>
                E-poçt <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="info@physics.az"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>
                Şifrə <span className="text-error-500">*</span>{" "}
              </Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrənizi daxil edin"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <Button className="w-full" size="sm" disabled={loading}>
                {loading ? "Daxil olunur" : "Daxil ol"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}