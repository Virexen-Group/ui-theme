/** Pixel-height widgets on a bounded 20px vertical lattice. Positions use zero-based cells. */
export interface DashboardPosition { column: number; row: number }
export interface DashboardRectangle extends DashboardPosition { columns: number; height: number }
export const DASHBOARD_ROW_PIXELS = 20;
export const DASHBOARD_MAX_ROWS = 1024;
export function rectangleFits(a: DashboardRectangle, b: DashboardRectangle, gap = 0) {
  const rows = (height:number) => Math.ceil((height + gap) / DASHBOARD_ROW_PIXELS);
  return a.column < b.column + b.columns && a.column + a.columns > b.column && a.row < b.row + rows(b.height) && a.row + rows(a.height) > b.row;
}
export function packDashboard(
  order: string[], dimensions: Record<string, {columns:number;height:number}>,
  positions: Record<string, DashboardPosition> = {}, columns = 12, gap = 14,
  priority?: string,
): Record<string, DashboardRectangle> {
  const result:Record<string,DashboardRectangle> = {};
  const ids=priority&&order.includes(priority)?[priority,...order.filter(id=>id!==priority)]:order;
  const size=(id:string)=>({columns:Math.max(1,Math.min(columns,Math.round(dimensions[id]?.columns||4))),height:Math.max(20,Math.min(720,dimensions[id]?.height||320))});
  const free=(candidate:DashboardRectangle)=>candidate.column>=0&&candidate.column+candidate.columns<=columns&&candidate.row>=0&&candidate.row+Math.ceil(candidate.height/20)<=DASHBOARD_MAX_ROWS&&!Object.values(result).some(other=>rectangleFits(candidate,other,gap));
  // Reserve valid explicit positions before migrating unpositioned cards, preserving intentional gaps.
  const pending:string[]=[];
  for(const id of ids){const value=positions[id],s=size(id);if(value&&Number.isInteger(value.column)&&Number.isInteger(value.row)){
    const candidate={column:Math.min(columns-s.columns,Math.max(0,value.column)),row:value.row,...s};
    if(free(candidate)){result[id]=candidate;continue;}
  }pending.push(id);}
  for(const id of pending){const s=size(id);let placed=false;
    const rows=[...new Set([0,...Object.values(result).map(item=>item.row+Math.ceil((item.height+gap)/20))])].sort((a,b)=>a-b);
    for(const row of rows){for(let column=0;column<=columns-s.columns;column++){const candidate={column,row,...s};if(free(candidate)){result[id]=candidate;placed=true;break;}}if(placed)break;}
    if(!placed)throw new Error('Dashboard layout exceeds its supported height.');
  }
  return result;
}
export function appendDashboardPosition(layout:Record<string,DashboardRectangle>):DashboardPosition {
  return {column:0,row:Math.max(0,...Object.values(layout).map(item=>item.row+Math.ceil((item.height+14)/20)))};
}
