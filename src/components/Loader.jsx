import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 text-white bg-black/70 px-6 py-4 rounded-lg"
      >
        <div className="text-lg font-semibold">Loading {Math.floor(progress)}%</div>
        <div className="w-40 h-2 bg-gray-700 rounded">
          <motion.div
            className="h-2 bg-blue-400 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>
      </motion.div>
    </Html>
  );
}
