// ErrorPage.js
import { useRouteError } from "react-router-dom";

type ErrorType = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  const { statusText, message } = (useRouteError() as ErrorType) ?? {
    statusText: "",
    message: "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl text-red-500 font-bold mb-4">{statusText}</h1>
        <p className="text-gray-700">{message}</p>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
