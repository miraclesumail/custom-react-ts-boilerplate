import winston from "winston";

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red"
  }
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf(info => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : ""}`;
  })
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: "./error.log",
      level: "error",
      format: formatter,
    });

    this.logger = winston.createLogger({
      level: "error",
      levels: customLevels.levels,
      transports: [prodTransport]
    });

    winston.addColors(customLevels.colors);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }
}

export const logger = new Logger();
