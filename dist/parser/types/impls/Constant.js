"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Definition_1 = require("../Definition");
const Type_1 = require("../../../metadata/Type");
const Required_1 = require("../../../metadata/Required");
const AllowAnon_1 = require("../../../metadata/AllowAnon");
let Constant = class Constant extends Definition_1.Definition {
    generateCode(writer) {
        writer.writeVariable(this.name);
        this.value.generateCode(writer);
        writer.commitCommand();
    }
};
__decorate([
    Type_1.Type("expression"),
    Required_1.Required(true)
], Constant.prototype, "value", void 0);
Constant = __decorate([
    AllowAnon_1.AllowAnon(false)
], Constant);
exports.default = Constant;
//# sourceMappingURL=Constant.js.map