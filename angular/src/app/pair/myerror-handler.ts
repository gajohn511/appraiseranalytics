import { ErrorHandler, Injectable } from "@angular/core";

import { JL } from "jsnlog";

@Injectable()
export class MyerrorHandler implements ErrorHandler {
  handleError(error: Error) {
    // debugger;
    console.error("Uncaught Exception: ", error.message);
    JL().fatalException("Uncaught Exception", error);
  }
}
