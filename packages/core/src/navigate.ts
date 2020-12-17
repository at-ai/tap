import { router } from "@uxland/uxl-prism";

export const navigate = (href: string) => {
  const queryString: string = window.location.search;
  router.navigate(`${href}${queryString}`);
};
