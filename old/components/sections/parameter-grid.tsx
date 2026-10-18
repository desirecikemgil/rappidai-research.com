export function ParameterGrid() {
  return (
    <div className="grid grid-cols-12 gap-[5px]" aria-hidden="true">
      {Array.from({ length: 96 }, (_, index) => {
        const emphasized = index % 17 === 0 || index % 23 === 0 || index === 54;
        return (
          <span
            key={index}
            className={`aspect-square border ${emphasized ? "parameter-node-active border-accent bg-accent/80" : "border-line bg-white"}`}
          />
        );
      })}
    </div>
  );
}
