function WithoutLayout({ children }) {
  return (
    <div className="wrapper">
        <div className="content">{children}</div>
    </div>
  );
}

export default WithoutLayout;
