import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isNavigateBack?: boolean;
  title?: string;
  navList?: {
    label: string;
    navigate: string;
  }[];
}
export const Header = ({
  navList = [],
  isNavigateBack,
  title,
}: HeaderProps) => {
  const router = useRouter();
  return (
    <header className={`bg-gray-200 p-6`}>
      {isNavigateBack && (
        <span className="flex gap-2 items-center">
          <ArrowBackIcon
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <h2 className="text-xl">{title}</h2>
        </span>
      )}
      <nav className="flex justify-end space-x-6">
        {navList?.map((item, index) => (
          <a key={index} href={item.navigate}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
