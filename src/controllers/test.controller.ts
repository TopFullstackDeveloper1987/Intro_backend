import catchAsync from '../utils/catchasync';
import { Request, Response } from '../types';
import { sendError, sendSuccess } from '../utils';
const fs = require("fs");
const csvParser = require("csv-parser");


export const getdata = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        let data = {}
        const result: any = [];

        fs.createReadStream("./full_stack_data.csv")
            .pipe(csvParser())
            .on("data", (data: any) => {
                result.push(data);
            })
            .on("end", () => {
                console.log(result.length);
                let years: any = {}
                let trip: any = {}
                let complaintcount = 0
                for (let i in result) {
                    let year = (result[i].date_of_stay.split("-")[2])
                    if (years[year]) {
                    } else {
                        years[year] = {
                            compliements: 0,
                            complaints: 0,
                        }
                    }
                    if (trip[result[i].trip_type]) {
                    } else {
                        trip[result[i].trip_type] = 0
                    }
                    trip[result[i].trip_type]++
                    if (result[i].Sentiment == "Negative") {
                        complaintcount++
                        years[year].compliements++

                    } else {
                        years[year].complaints++

                    }
                }
                let trendobj: any = {
                    data1: [],
                    data2: [],
                    labels: []
                }
                let tripobj: any = {
                    data: [],
                    labels: []
                }
                for (let i in years) {
                    trendobj.data1.push(years[i].compliements)
                    trendobj.data2.push(years[i].complaints)
                    trendobj.labels.push(i)
                }

                for (let i in trip) {
                    tripobj.data.push(trip[i])
                    tripobj.labels.push(i)
                }
                sendSuccess({ res, data: { data: result.slice(0, 3), trendobj, trip: tripobj, complaintcount }, });
            });

    }
);