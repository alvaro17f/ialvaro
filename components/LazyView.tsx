import { domAnimation, LazyMotion, m } from "framer-motion";
type Props = {
  children: React.ReactNode;
  once?: boolean;
  duration?: number;
};

export default function LazyView({
  children,
  once = true,
  duration = 1,
}: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: once }}
        transition={{ duration }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
