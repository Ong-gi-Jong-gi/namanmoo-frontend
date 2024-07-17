import clsx from "clsx"

const RecapBarUnit = ({isBright}: {isBright: boolean}) => {
  const unitClass = clsx('h-1 w-full', isBright ? 'bg-gray-40' : "bg-gray-20");

  return <div className={unitClass}></div>
}

export default RecapBarUnit;