/* eslint-disable react/prop-types */

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const NavbarButton = ({ name, selected }) => {
  return (
    <>
      <div
        className={classNames(
          selected
            ? "bg-slate-500 text-slate-50"
            : "hover:bg-slate-600 hover:text-slate-50",
          "cursor-pointer px-3 py-2 rounded-md text-lg"
        )}
      >
        {name}
      </div>
    </>
  );
};

export default NavbarButton;
