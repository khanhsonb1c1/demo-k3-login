import { PropsWithChildren, useEffect, useState } from "react";

type PropsType = PropsWithChildren<{
  onCountDown: any;
}>;

export default function CountDownComponent({ onCountDown }: PropsType) {
  const [count, setCount] = useState(240);

  useEffect(() => {
    if (count >= 1) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      console.log(count);

      return () => {
        clearInterval(interval);
      };
    } else {
      onCountDown();
    }
  }, []);

  return <div className="btn btn-primary w-75 p-3">{count}</div>;
}
