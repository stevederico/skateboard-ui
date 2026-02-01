import { Skeleton } from './shadcn/ui/skeleton.jsx';

/**
 * Card-shaped loading skeleton with three lines of varying width.
 *
 * @returns {JSX.Element} Card skeleton placeholder
 *
 * @example
 * import { CardSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';
 *
 * {loading ? <CardSkeleton /> : <Card data={data} />}
 */
export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

/**
 * Table loading skeleton with configurable row count.
 *
 * @param {Object} props
 * @param {number} [props.rows=5] - Number of skeleton rows
 * @returns {JSX.Element} Table skeleton placeholder
 *
 * @example
 * import { TableSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';
 *
 * {loading ? <TableSkeleton rows={3} /> : <Table data={data} />}
 */
export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

/**
 * Circular avatar loading skeleton.
 *
 * @returns {JSX.Element} Avatar skeleton placeholder
 *
 * @example
 * import { AvatarSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';
 *
 * {loading ? <AvatarSkeleton /> : <Avatar user={user} />}
 */
export function AvatarSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full" />;
}

/**
 * Form loading skeleton with label and input placeholders.
 *
 * @returns {JSX.Element} Form skeleton placeholder
 *
 * @example
 * import { FormSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';
 *
 * {loading ? <FormSkeleton /> : <MyForm />}
 */
export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
