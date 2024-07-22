import { useEffect, useState } from 'react';

const AlertBox = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 100 / 50, 100));
      }, 100);

      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
        clearInterval(interval);
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [visible, onClose]);

  // Styling with only blue-900 and text-white
  const alertStyles = `bg-blue-900 text-white`;

  return (
    visible && (
      <div className="fixed top-12 mt-8 left-1/2 transform -translate-x-1/2 w-72 p-4 rounded-lg  z-50">
        <div className={`flex flex-col justify-between p-2 rounded-lg ${alertStyles} transition-all duration-150 ease-in-out`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{message}</span>
            <button
              onClick={() => setVisible(false)}
              className="ml-4 text-2xl font-semibold"
            >
              &times;
            </button>
          </div>
          <div className="relative w-full h-1 bg-blue-800">
            <div
              className="absolute top-0 left-0 bg-white h-full"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertBox;
