import _ from "lodash";
import { Error } from "./constants/interface";
/**
 * @description Crops all identifiers from an error message string. Will return string message present after final ':' character.
 * eg 'Error: Error: functionName: Generic error message' -> 'Generic error message'
 * @param {{message: {String}}} error
 * @returns {String}
 */
const formatErrorMessage = (error: Error) => {
  const { message = "" } = error || {};

  const splitMessage = message.split(":"); // eg 'Error: Error: verifyUser: Unauthorized.'
  const messageString = splitMessage[splitMessage?.length - 1]; // string after the last : in the err message, aka 'Unauthorized.'

  return messageString || "There was an error saving your data";
};

/**
 * Executes a `callback` function on every item in the `data` array.
 * Splits execution in batches to avoid a server bottleneck.
 * @template T Data item like: `thirdparty`, `task`, `asset`, etc.
 * @param {T[]} data Set of data to iterate over
 * @param {(dataItem: T) => Promise<void>} callback Function that gets executed for every item in `data`
 * @param {Number} batchSize (optional) default: 20
 * @param {'ALL'|'SETTLED'} type (optional) default: ALL
 * @returns {{fulfilled: Array, rejected: Array}} array of failed and successful callbacks
 */
export const batchExecute = async (data, callback, batchSize = 20, type = "ALL") => {
  const batches = _.chunk(data, batchSize);

  const entity = {
    fulfilled: [],
    rejected: [],
  };

  switch (type) {
    case "SETTLED":
      for (const batch of batches) {
        await Promise.allSettled(
          batch.map((item) => {
            return callback(item);
          })
        ).then((results) => {
          results.forEach((result: any) => {
            const { status, value, reason } = result || {};
            const error = (reason || "").toString() || reason || "";
            const formattedError = formatErrorMessage({ message: error });
            entity[status].push(value || formattedError);
          });
        });
      }

      break;
    default:
      for (const batch of batches) {
        await Promise.all(
          batch.map((item) => {
            return callback(item);
          })
        ).then((values) => {
          entity.fulfilled.push(...(values || []));
        });
      }
  }

  if (type !== "SETTLED") {
    return entity.fulfilled;
  }

  return entity;
};
