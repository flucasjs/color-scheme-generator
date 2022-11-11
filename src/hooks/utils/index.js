import { useMediaQuery } from "../useMediaQuery";

export const useIsDesktop = () => useMediaQuery('(min-width: 50rem)');
