import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBarItems(props: any) {
  const { name } = props;
  const router = useRouter();
  const selected = router.asPath === `/${name.toLowerCase()}`;
  return (
    <Link href={`/${name.toLowerCase()}`}>
      <motion.div
        className={`flex h-[50px] w-full items-center justify-center rounded-[10px] hover:cursor-pointer ${
          selected
            ? "bg-white"
            : "bg-primary-main hover:bg-primary-hover active:bg-primary-focus"
        }`}
      >
        <h2
          className={`pt-1 text-lg font-bold ${
            selected ? "text-primary-main" : "text-white"
          }`}
        >
          {name}
        </h2>
      </motion.div>
    </Link>
  );
}
