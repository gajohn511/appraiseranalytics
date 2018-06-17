import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Inject
} from "@angular/core";
import { isNull, isNullOrUndefined, error, debug } from "util";
import * as _ from "lodash";

// import { Subject } from "rxjs/Subject";
// import { Observable } from "rxjs/Observable";
// import { Subscription } from "rxjs/Subscription";

// import { fromEvent } from "rxjs/observable/fromEvent";
// import { ajax } from 'rxjs/observable/dom/ajax';

import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  concat as concatu,
  mapTo,
  tap,
  startWith,
  mergeMap,
  flatMap,
  catchError,
  onErrorResumeNext
  // interval
} from "rxjs/operators";

import {
  Subject,
  Observable,
  Subscription,
  fromEvent,
  of,
  interval,
  concat,
  timer,
  from,
  empty,
  never
} from "rxjs";

// import { debounce } from "rxjs/operators/debounce";
// import { of } from "rxjs/observable/of";
// import { interval } from "rxjs/observable/interval";
// import { concat } from "rxjs/observable/concat";
// import { timer } from "rxjs/observable/timer";
// import { from } from "rxjs/observable/from";
// import { empty } from "rxjs/observable/empty";

// import "rxjs/add/observable/of";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";
// import "rxjs/add/operator/debounceTime";
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/operator/concat";
// import "rxjs/add/operator/take";
// import "rxjs/add/operator/merge";
// import "rxjs/add/operator/catch";

// import * as tim from "timers";
// import {  } from "rxjs/Observable/

// import * as stack from "stacktrace-js";
import * as stack from "stack-trace";

import { JL } from "jsnlog";

interface filteredList {
  // glaOption: number;
  list?: MLS[];
  prop?: MLS;
  // fbath?: boolean;
  // sqftlist?: sqft[];
  // stat(property: MLS): boolean;
}

interface sqft {
  pricePer: number;
  propertyOne: string;
  propertyTwo: string;
  salePriceOne: number;
  salePriceTwo: number;
  glaOne: number;
  glaTwo: number;
  glaoption: number;
  propA: MLS;
  propB: MLS;
  // pairs?: sqft[];
}

interface pairs {
  Prop: MLS;
  Pairs?: pair[];
  Median?: number;
  Mls?: string;
}

interface pair {
  SalePrice: number;
  Address: string;
  Gla: number;
  RegressionPrice: number;
  Bedroom: number;
  Bathroom: number;
  Mls: string;
}

interface optionDash {
  type: OptionType;
  value: any;
}

export enum OptionType {
  gla = 1,
  other = 2
}

enum ObservableType {
  success = 0,
  error = 1
}

@Component({
  selector: "app-bathroom-analysis",
  templateUrl: "./bathroom-analysis.component.html",
  styleUrls: ["./bathroom-analysis.component.css"]
})
export class BathroomAnalysisComponent implements OnInit, OnDestroy {
  constructor(@Inject("JSNLOG") JL: JL.JSNLog) {
    this.JL = JL;
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    console.log("goodbye");
  }

  ngOnInit() {
    window["properties"] = this.properties;
    let cnt = 0;
    // BathA search
    const searchBox = document.getElementById("batha");
    const observSearch$ = fromEvent(searchBox, "input").pipe(
      map((e: KeyboardEvent) => +(e.target as HTMLInputElement).value),
      // map((e: KeyboardEvent) => {
      //   console.log("accessed: ");
      //   return +(e.target as HTMLInputElement).value;
      // }),
      filter((val) => val > 0),
      distinctUntilChanged(),
      tap((val) => (this.bathb = val + 1)),
      debounceTime(10),
      filter((v) => this.validate(v) === ObservableType.success),
      switchMap((v) => this.analyze()),
      catchError((e, o) => this.handleError(e, o))
    );

    this.subscription1$ = observSearch$.subscribe(this.sbesub());

    // (list) => {
    //   debugger;
    //   if (this.ispair(list)) {
    //     this.list = of(list);
    //   } else {
    //     console.log("yo");
    //   }
    // },
    // (err) => console.log("error"),
    // () => console.log("complete")
    // this.searchBoxEventNext,
    // this.searchBoxEventError,
    // this.searchBoxEventComplete
    // );

    // (
    //   (list) => {
    //     if (this.ispair(list)) {
    //       this.list = of(list);
    //     }
    //   },
    //   (e) => console.log("There was an error: ", e.message),
    //   () => console.log("complete")
    // );

    // const ispair = function(item: {} | pairs[]): item is pairs[] {
    //   return (<pairs[]>item).length !== undefined;
    // };

    // gla Subject Change
    // const observGLA$ = this.glaSubject.pipe(
    //   debounceTime(10),
    //   switchMap((gla) => {
    //     console.log("observeGLA");
    //     this.gla = +gla;
    //     return this.generateList();
    //   })
    // );

    // options Observer

    // TODO FIX
    /*
    const option$ = this.optSubject.pipe(
      tap((val) => this.optionChk(val)),
      debounceTime(1000),
      switchMap((_) => this.generateList())
    );

    this.optionsSubs = option$.subscribe((list) => (this.list = of(list)));
    */

    //

    // setTimeout(() => {
    //   console.log("hello world!!!!");
    // }, 5000);

    // let first = Observable.create((o) => {
    //   // o.next("hello");
    //   // o.next("world");

    //   setTimeout(function(p) {
    //     o.next(1);
    //   }, 5000);
    //   // ,
    //   //   (err) => {},
    //   //   () => {};
    //   //o.complete();
    // });

    // first.subscribe((x) => console.log(x));

    // let second = Observable.create((o) => {
    //   setTimeout(() => {
    //     o.next(2);
    //   }, 6000),
    //     (err) => {},
    //     () => {};
    // });

    // second attempt ------------------>

    // let first = interval(1000).take(3);
    // first.subscribe((val) => console.log(val));

    // let second = interval(1500).take(3);

    // // first.
    // // let result = first.concat(second);
    // let result = concat(first, second);

    // result.subscribe((val) => console.log(val));

    // third attempt --------------------->

    // Observable.of("hello", "world", "john")
    //   .map((x) => x + "!!!")
    //   .subscribe((o) => console.log(o));

    // fourth attempt: ---------------------->

    // let first = timer(5000, 100)
    //   .map((r) => {
    //     return { source: 1, value: r };
    //   })
    //   .take(4);

    // let second = timer(500)
    //   .map((r) => {
    //     return { source: 2, value: r };
    //   })
    //   .take(4);

    // this.subscription1$ = first
    //   .merge(second)
    //   .subscribe((res) => console.log(JSON.stringify(res)));

    // fifth attempt: ---------------------------->
    // const source = timer(0, 5000);
    // //switch to new inner observable when source emits, invoke project function and emit values
    // const example = source
    //   .pipe(
    //     switchMap(
    //       (_) => interval(2000),
    //       (outerValue, innerValue, outerIndex, innerIndex) => ({
    //         outerValue,
    //         innerValue,
    //         outerIndex,
    //         innerIndex
    //       })
    //     )
    //   )
    //   .take(5);
    // const subscribe = example.subscribe((val) => console.log(val));

    // end
  }

  // properties >
  @Input() properties: MLS[];

  list: Observable<pairs[]>;

  consoleMsg: Observable<string>;
  stack: {} = {};

  batha: number;
  bathb: number;

  bathType: string = "fbaths";
  bathOptions: {} = [
    { text: "Full", value: "fbaths" },
    { text: "Half", value: "hbaths" }
  ];

  glaoptions: {}[] = [
    { text: "10%", value: 10 },
    { text: "15%", value: 15 },
    { text: "20%", value: 20 },
    { text: "25%", value: 25 },
    { text: "30%", value: 30 }
  ];
  gla: number = 10;

  JL: JL.JSNLog;

  // private glaSubject: Subject<number> = new Subject();
  private optSubject: Subject<optionDash> = new Subject();

  subscription1$: Subscription;
  optionsSubs: Subscription;

  // getters & setters

  get listA(): MLS[] {
    try {
      let a = _.filter(
        this.properties,
        (x) => x[this.bathType] === +this.batha
      );
      return a;
    } catch (e) {
      debugger;
    }
  }

  get listB(): MLS[] {
    return _.filter(
      this.properties,
      (x) => x[this.bathType] === +this.bathb
    );
  }

  // ->

  // observable extensions / functions
  private testme = () => {
    return "hello world";
  };

  private ispair = (item: {} | pairs[]): item is pairs[] => {
    return (<pairs[]>item).length !== undefined;
  };

  private handleError(err: any, observable: any) {
    debugger;
    if (err instanceof Error) {
      // log
      console.log("Houston, we have a problem: ", err.message);

      // show message to user
      this.consoleMsg = of(err.message);

      setTimeout(() => {
        this.consoleMsg = of("");
      }, 10000);
    }

    return of({});
  }

  private searchBoxEventNext = (list) => {
    if (this.ispair(list)) this.list = of(list);
  };
  private searchBoxEventError(err) {
    console.log("Opps, unhandled error: ", err);
  }
  private searchBoxEventComplete() {
    console.log("complete");
  }

  sbesub = () => {
    return {
      next: (list) => {
        if (this.ispair(list)) {
          window["properties"] = list;
          this.list = of(list);
        }
      },
      error: (e) => console.log("Opps, unhandled error: ", e),
      complete: () => console.log("complete")
    };
  };

  // ->

  _keypressNumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.stopPropagation();
      event.returnValue = false;
      event.cancelBubble = true;
      event.preventDefault();
      return false;
    }

    // debugger;
    // if (event.currentTarget.name === "batha") {
    //   this.bathb = +(event.currentTarget.value + inputChar) + 1;
    // }
  }

  validateBedButton(): boolean {
    if (isNullOrUndefined(this.properties)) {
      return false;
    }

    if (this.properties.length == 0) {
      return false;
    }

    return true;
  }

  // TODO:
  // beginProcess() {
  //   const flist: filteredList[] = [];
  //   this.processAnalysis(flist);
  // }

  //// back up 5/12/2018
  // processAnalysis(out: filteredList[] = []) {
  //   //
  //   for (let prop of this.listA) {
  //     out.push({ prop, list: this.listB });

  //     if (!this.filterBedrooms(prop, out)) {
  //       continue;
  //     }
  //   }

  //   return true;
  // }

  processAnalysis(out: filteredList[]) {
    // debugger;
    for (let prop of this.listA) {
      let obj: filteredList = {};
      _.assign(obj, this.filterBedrooms(prop, this.listB));
      _.assign(obj, this.filterGLA(prop, obj.list));
      out.push(obj);
    }

    return true;
  }

  analyze(): Observable<pairs[]> {
    const list: filteredList[] = [];
    const self = this;
    const output = Observable.create(function(observer) {
      try {
        // debugger;
        let b = self.listA;
        for (let prop of self.listA) {
          let obj: filteredList = {};
          _.assign(obj, self.filterBedrooms(prop, self.listB));
          _.assign(obj, self.filterGLA(prop, obj.list));
          list.push(obj);
        }

        observer.next(self.refactor(list));
        observer.complete();
      } catch (e) {
        // debugger;
        observer.error(new Error(e));
      }
    });

    return output;
  }

  validate(arg: number): ObservableType {
    try {
      if (isNullOrUndefined(this.properties)) {
        throw new Error("no properties to filter through");
      }

      if (!this.properties.length) {
        throw new Error("no properties to filter through");
      }

      if (+this.batha === +this.bathb) {
        throw new Error(
          "bathroom criteria needs to be different from one another"
        );
      }

      if (
        !_.filter(this.properties, (x) => x[this.bathType] === +this.batha)
          .length
      ) {
        throw new Error(`no properties with '${this.bathb}' bathrooms.`);
      }

      if (
        !_.filter(this.properties, (x) => x[this.bathType] === +this.bathb)
          .length
      ) {
        throw new Error(`no properties with '${this.bathb}' bathrooms.`);
      }

      if (
        _.filter(
          this.properties,
          (x) =>
            x[this.bathType] >= +this.batha &&
            x[this.bathType] <= +this.bathb
        ).length <= 0
      ) {
        throw new Error("results were empty");
      }
    } catch (e) {
      this.handleError(e, null);
      return ObservableType.error;
    }
    return ObservableType.success;
  }

  // obsolete
  // get validatePriorTo(): boolean {
  //   this.consoleMsg = "";

  //   if (isNullOrUndefined(this.properties)) {
  //     this.consoleMsg = "no properties to filter through";
  //     return false;
  //   }

  //   if (!this.properties.length) {
  //     this.consoleMsg = "no properties to filter through";
  //     return false;
  //   }

  //   if (+this.batha === +this.bathb) {
  //     this.consoleMsg =
  //       "bathroom criteria needs to be different from one another";
  //     return false;
  //   }

  //   if (
  //     _.filter(
  //       this.properties,
  //       (x) =>
  //         x[this.bathType] >= +this.batha &&
  //         x[this.bathType] <= +this.bathb
  //     ).length <= 0
  //   ) {
  //     this.consoleMsg = "results were empty";
  //     // throw new Error("results were empty 2");
  //     return false;
  //   }

  //   // if (
  //   //   _.filter(this.properties, (x) => x[this.bathType] === +this.batha)
  //   //     .length === 0
  //   // ) {
  //   //   this.consoleMsg = `results were empty for ${this.batha} bathrooms`;
  //   //   return false;
  //   // }

  //   // if (
  //   //   _.filter(this.properties, (x) => x[this.bathType] === +this.bathb)
  //   //     .length === 0
  //   // ) {
  //   //   this.consoleMsg = `results were empty for ${this.bathb} bathrooms`;
  //   //   return false;
  //   // }

  //   // debugger;
  //   return true;
  // }

  //// back up 5/12/2018
  // filterBedrooms(prop: MLS, outlist: filteredList[]): boolean {
  //   const obj = this.FIND(prop, outlist);

  //   obj.list = _.filter(obj.list, (x) => x.beds === prop.beds);

  //   if (!obj.list.length) {
  //     return false;
  //   }

  //   return true;
  // }

  filterBedrooms(prop: MLS, list: MLS[]): filteredList {
    return {
      prop,
      list: _.filter(list, (p) => p.beds === prop.beds)
    };
  }

  filterGLA(prop: MLS, list: MLS[]): filteredList {
    const base = prop.gla - prop.gla * (+this.gla / 100);
    const top = prop.gla + prop.gla * (+this.gla / 100);
    return {
      prop,
      list: _.filter(list, (p) => p.gla >= base && p.gla <= top)
    };
  }

  // obsolete
  generateList(arg) {
    let slist: pairs[] = [];

    // if (!this.validatePriorTo) {
    //   return of(slist);
    // }

    debugger;
    from(this.analyze())
      .pipe(
        // startWith(0),
        flatMap((val) => {
          debugger;
          // return of("nada");
          return of(val);
        })
        // catchError((v) => {
        //   debugger;
        //   return of(v.message);
        // })
      )
      .subscribe(
        (v) => console.log(v),
        (e) => console.log("me error: ", e.message),
        () => console.log("completed")
      );

    // let flist: filteredList[] = [];
    // if (!this.processAnalysis(flist)) {
    //   // this.consoleMsg = "Error occured"; //TODO
    //   return of(slist);
    // }

    // slist = this.refactor(flist);
    //window["jj"] = slist;
    return of(slist);
  }

  optionChk(opt: optionDash): void {
    switch (opt.type) {
      case OptionType.gla:
        this.gla = +opt.value;
        break;
      case OptionType.other:
        //TODO
        break;
      default:
        //TODO
        break;
    }
  }

  // utilities >

  FIND(prop: MLS, list: filteredList[]) {
    return _.find(list, (e) => e.prop === prop);
  }

  CONTINUE(prop: MLS) {
    console.log(
      `skipping prop: ${prop.address}, bedroom match ${prop.beds}`
    );
  }

  // interface pairs {
  //   Prop: MLS;
  //   Pairs?: pair[];
  //   Median?: number;
  // }

  // interface pair {
  //   SalePrice: number;
  //   Address: string;
  //   Gla: number;
  //   RegressionPrice: number;
  // }

  refactor(list: filteredList[]): pairs[] {
    const refactored: pairs[] = [];
    // debugger;
    for (let item of _.filter(list, (e) => e.list.length)) {
      const thisPairs: pairs = {
        Prop: item.prop,
        Pairs: [],
        Median: 0
      };

      for (let p of item.list) {
        const thisPair: pair = {
          SalePrice: p.salePrice,
          Address: p.address,
          Gla: p.gla,
          RegressionPrice: Math.abs(item.prop.salePrice - p.salePrice),
          Bedroom: p.beds,
          Bathroom: p.fbaths,
          Mls: p.mls
        };

        thisPairs.Pairs.push(thisPair);
      }

      // Median
      thisPairs.Median = this.getMedian(
        _.map(thisPairs.Pairs, (e) => e.RegressionPrice)
      );

      // Aggregate MLS #'s
      thisPairs.Mls =
        thisPairs.Prop.mls +
        ", " +
        _.map(thisPairs.Pairs, (x) => x.Mls).join(", ");

      refactored.push(thisPairs);
    }

    //// list = _.filter(list, (e) => e.list.length);
    // for (let item of _.filter(list, (e) => e.list.length)) {
    //   const propA = item.prop;

    //   for (let propB of item.list) {
    //     const sqft: sqft = {
    //       pricePer: 0,
    //       propertyOne: "",
    //       propertyTwo: "",
    //       salePriceOne: 0,
    //       salePriceTwo: 0,
    //       glaOne: 0,
    //       glaTwo: 0,
    //       glaoption: 0,
    //       propA,
    //       propB
    //     };

    //     // property A
    //     sqft.propertyOne = propA.address;
    //     sqft.salePriceOne = propA.salePrice;
    //     sqft.glaOne = propA.gla;

    //     // property B
    //     sqft.propertyTwo = propB.address;
    //     sqft.salePriceTwo = propB.salePrice;
    //     sqft.glaTwo = propB.gla;

    //     sqft.pricePer = Math.abs(sqft.salePriceOne - sqft.salePriceTwo);
    //     dlist.push(sqft);
    //   }
    // }

    return refactored;
  }

  getMedian(list: number[]): number {
    if (!list.length) {
      return 0;
    }

    const sorted = _.sortBy(list); //list.sort();
    let middle = Math.floor(sorted.length / 2);
    let isEven = sorted.length % 2 === 0;
    return isEven
      ? (sorted[middle] + sorted[middle - 1]) / 2
      : sorted[middle];
  }

  // COMPONENT UTILITES

  IsGlaOptionActive(arg: number): string {
    return arg === +this.gla ? "active" : "";
  }

  // obsolete 5/12/2018
  get IsAnyProperties(): boolean {
    if (isNullOrUndefined(this.properties)) {
      return false;
    }

    if (this.properties.length == 0) {
      return false;
    }

    return this.properties.length > 0 && +this.bathb > 0;
  }

  public options: any = Object.assign({}, OptionType);
  myOption(option: number, value: any): void {
    this.optSubject.next({ type: option, value });
  }

  start() {
    // stack.get().then((stack) => console.log(stack));
    // let trace = stack.parse(new Error("something went right"))[0];
    // let self = trace.getThis();
    // throw new Error("Test exception yay!");
    // this.jl().error("something beautiful happened :)");
    // debugger;
  }

  // ->
}
