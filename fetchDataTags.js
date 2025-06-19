"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
var path = require("path");
var folderPath = 'z:'; // Shared drive or folder
var configPath = './tags.json'; // Config file with tag names
var tags = [];
// Load tags from the config file once on startup
function loadTags() {
    return __awaiter(this, void 0, void 0, function () {
        var configData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readFile(configPath, 'utf-8')];
                case 1:
                    configData = _a.sent();
                    tags = JSON.parse(configData);
                    console.log('Loaded Tags:', tags);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error('Error reading tags config:', error_1.message);
                    }
                    else {
                        console.error('Unknown error reading tags config:', error_1);
                    }
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Read and display JSON files for each tag
function readAndDisplayTags() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, tags_1, tag, filePath, fileContent, jsonData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, tags_1 = tags;
                    _a.label = 1;
                case 1:
                    if (!(_i < tags_1.length)) return [3 /*break*/, 6];
                    tag = tags_1[_i];
                    filePath = path.join(folderPath, "".concat(tag, ".json"));
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
                case 3:
                    fileContent = _a.sent();
                    jsonData = JSON.parse(fileContent);
                    console.log("\n===== ".concat(tag, ".json ====="));
                    console.log(JSON.stringify(jsonData, null, 2));
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        console.error("Error reading file \"".concat(tag, ".json\":"), error_2.message);
                    }
                    else {
                        console.error("Unknown error reading file \"".concat(tag, ".json\":"), error_2);
                    }
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Entry point
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadTags()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, readAndDisplayTags()];
                case 2:
                    _a.sent();
                    setInterval(function () {
                        readAndDisplayTags();
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
main();
