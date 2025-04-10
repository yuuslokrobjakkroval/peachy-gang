// ContentLoader.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import {
  fetchSuccess,
  fetchInfo,
  fetchWarning,
  fetchError,
} from "@/redux/actions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define types for the Redux state
interface CommonState {
  error: string | null;
  loading: boolean;
  message: string | null;
  info: string | null;
  warning: string | null;
}

// Define types for the Notification props
interface NotificationProps {
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

// Custom Notification component styled with Tailwind CSS (Shadcn UI style)
const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
}) => {
  const iconMap = {
    success: <CheckCircle2 className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
  };

  const typeStyles = {
    success: "bg-green-50 text-green-800 border-green-500",
    error: "bg-red-50 text-red-800 border-red-500",
    info: "bg-blue-50 text-blue-800 border-blue-500",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-500",
  };

  return (
    <div
      className={`flex items-center w-80 p-4 border-l-4 rounded-lg shadow-md ${typeStyles[type]}`}
    >
      <Alert>
        {iconMap[type]}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};

const ContentLoader: React.FC = () => {
  const { error, loading, message, info, warning } = useSelector(
    (state: { common: CommonState }) => state.common
  );
  const dispatch = useDispatch<AppDispatch>();
  const [openError, setOpenError] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  useEffect(() => {
    setOpenError(Boolean(error));
  }, [error]);

  useEffect(() => {
    setOpenSuccess(Boolean(message));
  }, [message]);

  return (
    <React.Fragment>
      {openError ? (
        <Notification type="error" title="Error" message={error || ""} />
      ) : null}
      {openSuccess ? (
        <Notification type="success" title="Success" message={message || ""} />
      ) : null}
    </React.Fragment>
  );
};

export default ContentLoader;
