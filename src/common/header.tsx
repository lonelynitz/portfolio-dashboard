interface HeaderProps {
  navList?: {
    label : string,
    navigate : string
  }[];
}
export const Header = ({ navList = [] }: HeaderProps) => {
  return (
    <header className={`bg-gray-200 ${navList.length ? `p-6` : `p-8`}`}>
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
