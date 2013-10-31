/*
 * Aria Templates 1.4.11 - 15 Oct 2013
 *
 * Copyright 2009-2013 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface for the inspector module
 */
Aria.interfaceDefinition({
    $classpath : "aria.tools.inspector.IInspectorModule",
    $extends : "aria.templates.IModuleCtrl",
    $interface : {
        // The $interface section contains empty functions and empty object or array properties
        displayHighlight : function () {},
        reloadTemplate : function () {},
        refreshTemplate : function () {},
        reloadModule : function () {},
        getSource : function () {}
    },
    $events : {
        contentChanged : {
            description : "Raised when application content has changed"
        }
    }
});