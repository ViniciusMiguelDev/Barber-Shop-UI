export interface iSnackbarManagerService {
  show(message: string, action?: string, duration?: number): void;
}
