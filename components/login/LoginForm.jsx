import { useState } from "react";
import { Notification } from "../Notification";
import { useRouter } from "next/router";

const LoginForm = ({ onSubmit, initialData }) => {
    const [notification, setNotification] = useState(null); // Estado para controlar el mensaje de error
    const [status, setStatus] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
        loginPassword: "",
        loginEmail: "",
    });
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);

        if (formData.loginEmail) {
            handleLogin();
        } else {
            handleSignUp();
        }
    };

    const toggleLoginForm = () => {
        setFormData({
            name: "",
            password: "",
            email: "",
            loginPassword: "",
            loginEmail: "",
        });
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    const handleLogin = async () => {
        // Envía los datos del usuario al servidor para la autenticación
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/auth/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.loginEmail,
                        password: formData.loginPassword,
                    }),
                }
            );

            response = await response.json()
            if (response) {
                // setError('Error de autenticación: ' + errorData.message);
                setStatus("success");
                localStorage.setItem("user", JSON.stringify(response));

                // Oculta el mensaje de error después de 5 segundos (5000 ms)
                setTimeout(() => {
                    setNotification(null);
                    location.reload()
                }, 2000);
            } else {
                // La autenticación falló, maneja el error
                const errorData = await response.json();
                console.error("Error de autenticación:", errorData);

                // setError('Error de autenticación: ' + errorData.message);
                setNotification(
                    "El usuario y/o la contraseña son incorrectos."
                );
                setStatus("error");

                // Oculta el mensaje de error después de 5 segundos (5000 ms)
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            }
        } catch (error) {
            console.log('error: ', error);
            // setError('Error de autenticación: ' + errorData.message);
            setNotification("El usuario y/o la contraseña son incorrectos.");
            setStatus("error");

            // Oculta el mensaje de error después de 5 segundos (5000 ms)
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleSignUp = async () => {
        // Envía los datos del usuario al servidor para la autenticación
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                    }),
                }
            );

            if (response.ok) {
                // setError('Error de autenticación: ' + errorData.message);
                setStatus("success");

                // Oculta el mensaje de error después de 5 segundos (5000 ms)
                setTimeout(() => {
                    setNotification(null);
                    window.reload()
                }, 2000);
            } else {
                // La autenticación falló, maneja el error
                const errorData = await response.json();
                console.error("Error de autenticación:", errorData);

                // setError('Error de autenticación: ' + errorData.message);
                setNotification(
                    "El usuario y/o la contraseña son incorrectos."
                );
                setStatus("error");

                // Oculta el mensaje de error después de 5 segundos (5000 ms)
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            }
        } catch (error) {
            // setError('Error de autenticación: ' + errorData.message);
            setNotification("El usuario y/o la contraseña son incorrectos.");
            setStatus("error");

            // Oculta el mensaje de error después de 5 segundos (5000 ms)
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    return (
        <div className="-top-10">
            <form
                onSubmit={handleSubmit}
                className={`p-4 border border-gray-300 rounded-lg shadow-md w-128 ${
                    isLoginFormVisible ? "hidden" : "block"
                }`}
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Sign up
                    </button>
                </div>
            </form>

            <form
                onSubmit={handleSubmit}
                className={`p-4 border border-gray-300 rounded-lg shadow-md w-128 ${
                    isLoginFormVisible ? "block" : "hidden"
                }`}
            >
                <div className="mb-4">
                    <label
                        htmlFor="loginEmail"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="loginEmail"
                        name="loginEmail"
                        // Puedes agregar un nuevo estado y función de cambio para los campos de inicio de sesión si es necesario
                        value={formData.loginEmail}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="loginPassword"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="loginPassword"
                        value={formData.loginPassword}
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Log in
                    </button>
                </div>
            </form>

            <div className="mt-2">
                <button
                    onClick={toggleLoginForm}
                    className="text-blue-500 underline cursor-pointer"
                >
                    {isLoginFormVisible
                        ? "¿No tienes cuenta? Regístrate"
                        : "¿Ya tienes cuenta? Inicia sesión"}
                </button>

                {notification && (
                    <Notification
                        status={status === "error" ? "error" : "success"}
                        msj={notification}
                    />
                )}
            </div>
        </div>
    );
};

export default LoginForm;
