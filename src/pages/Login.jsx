import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!login) {
      newErrors.login = "Email or Mobile Number is required";
    } else if (
      !emailRegex.test(login) &&
      !mobileRegex.test(login)
    ) {
      newErrors.login = "Enter valid Email or Mobile Number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("isLoggedIn", true);

      navigate("/dashboard");
    }
  };

  return (
    <div className="login-bg">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-lg-5 col-md-7 col-sm-10">

            <div className="card shadow-lg border-0 rounded-4">

              <div className="card-body p-5">

                <div className="text-center mb-4">

                  <i
                    className="bi bi-box-seam-fill text-primary"
                    style={{ fontSize: "60px" }}
                  ></i>

                  <h2 className="fw-bold mt-3">
                    Inventory Management
                  </h2>

                  <p className="text-muted">
                    Sign in to continue
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email / Mobile Number
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <i className="bi bi-person-fill"></i>
                      </span>

                      <input
                        type="text"
                        className={`form-control ${
                          errors.login ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Email or Mobile"
                        value={login}
                        onChange={(e) =>
                          setLogin(e.target.value)
                        }
                      />

                    </div>

                    {errors.login && (
                      <small className="text-danger">
                        {errors.login}
                      </small>
                    )}

                  </div>

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>

                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        className={`form-control ${
                          errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        <i
                          className={
                            showPassword
                              ? "bi bi-eye-slash-fill"
                              : "bi bi-eye-fill"
                          }
                        ></i>
                      </button>

                    </div>

                    {errors.password && (
                      <small className="text-danger">
                        {errors.password}
                      </small>
                    )}

                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div className="form-check">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="remember"
                      >
                        Remember Me
                      </label>

                    </div>

                    <a href="#" className="text-decoration-none">
                      Forgot Password?
                    </a>

                  </div>

                  <button
                    className="btn btn-primary w-100 py-2 fw-bold"
                  >
                    Login
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;