import { headers } from "next/headers";

export class Logger {
  private context: string;
  private requestId: string;

  constructor(context: string) {
    this.context = context;
    this.requestId = this.generateRequestId();
  }

  private generateRequestId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private getHeadersInfo() {
    try {
      const headersList = headers();
      return {
        userAgent: headersList.get("user-agent"),
        accept: headersList.get("accept"),
        host: headersList.get("host"),
      };
    } catch (error) {
      return { error: "Could not get headers" };
    }
  }

  info(message: string, data?: any) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: "INFO",
      context: this.context,
      requestId: this.requestId,
      message,
      data,
      headers: this.getHeadersInfo(),
    };

    console.log("🔵 [INFO]", JSON.stringify(logData, null, 2));
  }

  warn(message: string, data?: any) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: "WARN",
      context: this.context,
      requestId: this.requestId,
      message,
      data,
      headers: this.getHeadersInfo(),
    };

    console.warn("🟡 [WARN]", JSON.stringify(logData, null, 2));
  }

  error(message: string, error?: any) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: "ERROR",
      context: this.context,
      requestId: this.requestId,
      message,
      error: error?.message || error,
      stack: error?.stack,
      headers: this.getHeadersInfo(),
    };

    console.error("🔴 [ERROR]", JSON.stringify(logData, null, 2));
  }

  debug(message: string, data?: any) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: "DEBUG",
      context: this.context,
      requestId: this.requestId,
      message,
      data,
      headers: this.getHeadersInfo(),
    };

    console.debug("🟢 [DEBUG]", JSON.stringify(logData, null, 2));
  }
}
