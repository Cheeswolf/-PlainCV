interface PrintButtonProps { className?: string; }

export function PrintButton({ className }: PrintButtonProps) {
  return <button type="button" className={className} onClick={() => window.print()}>导出 PDF</button>;
}
