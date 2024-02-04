import React from 'react';


function designGuidelines() {
  return (
    <p>
      Here are some best design principles for LEAP application development.

      1. Set two response codes: E1000 and S1000 for capturing errors and success cases respectively.
      Always encorporte the message in $message.

      2. If you want to prepare variables for next plugin, do not write preparation logic in the output
      condition of previous plugin. Instead follow the below approach.

      a. Write only orchestration code in the output condition. Just write code which tells which module to
      next go for, based on the response we obtain.

      b. Preparation for next plugin can be done in one intermediate code module plugin.

      3. Do not write sleep code, as it will block entire engine.

      4. Decouple code as much as possible. A plugin should perform only one task.

      a. Suppose there is a menu plugin, which is followed by http plugin. Do not prepare payload of http
      plugin in the menu plugin. Instead, introduce a code module in between and prepare the payload in
      that plugin.

      5. Initialise variables in camelCase notation. Give meaningful names.

      a. Examples: customerNumber, subscriberType, transactionType, payloadForVerification
    </p>
  );
};

export default designGuidelines;