import { formatServiceArea, type ServiceAreaCopy } from "@/lib/geo";
import { getVisitorGeo } from "@/lib/getVisitorGeo";

export const getServiceArea = async (): Promise<ServiceAreaCopy> =>
  formatServiceArea(await getVisitorGeo());
