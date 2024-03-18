import { useToast } from "@/components/ui/use-toast";
import { useAppProvider } from "@/stores/app.provider";

export default function useLogout() {
  const { handleLogout: logout } = useAppProvider();
  const { toast } = useToast();

  function handleLogout() {
    logout();

    toast({
      title: "User logout successfully",
    });
  }

  return handleLogout;
}
