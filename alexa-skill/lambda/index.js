// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
var AWS = require('aws-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to the Accident Guide. We are sorry to hear if you may have been in an accident. How can we assist you today?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const ClaimIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClaimIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can file a claim by going to nationwide.com and clicking on "file a claim" or by calling 1-800-421-3535';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const InjuredIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InjuredIntent';
    },
    handle(handlerInput) {
        const speakOutput = "If the injury is serious please call 911 immediately. Otherwise seek medical treatment as soon as you are able to";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const NoobIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoobIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Make sure everyone is safe and okay. If possible, safely move the vehicle to the side of the road. Notify the police. Exchange insurance information with the other driver. Inspect and take pictures of the damage. Then, notify Nationwide of the accident.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const OtherPersonIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OtherPersonIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Information that you need from the other person is their name, phone number, insurance provider, policy number, and license plate number.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const TowIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TowIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can request Roadside Assistance by going to nationwide dot RSA help dot com or by calling 1-800-421-3535.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const AssociateIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AssociateIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can talk to one of our nationwide associates by calling 1-800-421-3535.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const AddressIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddressIntent';
    },
    handle(handlerInput) {
        var speakOutput = 'Please check your email for the accident location.';
        // var request = handlerInput.requestEnvelope.request;
        // var context = handlerInput.requestEnvelope.context;
        // var isGeolocationSupported = context.System.device.supportedInterfaces.Geolocation === null || context.System.device.supportedInterfaces.Geolocation === undefined ? false : true;
        // var geoObject = context.Geolocation;
        // if (isGeolocationSupported) {
        //     speakOutput = 'Geolocation is enabled and working';
        //     var dataRecentness = (new Date(request.timestamp) - new Date(geoObject.timestamp)) / 1000; // dataRecentness in seconds
        //     var TIMING_THRESHOLD = 60; // data gathered within last 60 seconds
        //     var ACCURACY_THRESHOLD = 100; // accuracy of 100 meters
        //                 if (geoObject && geoObject.coordinate && geoObject.coordinate.accuracyInMeters < ACCURACY_THRESHOLD && dataRecentness < TIMING_THRESHOLD) {
        //                     //  grab dat data yo
        //                     var lat = geoObject.coordinate.latitudeInDegrees;
        //                     var lon = geoObject.coordinate.longitudeInDegrees;
        //                 }
        // }

        // //TODO - send address back
        
        const SESConfig = {
            apiVersion: '2010-12-01',
            accessKeyId: '',
            secretAccessKey: '',
            regionName: 'us-east-1'
        };
        
        // Create sendEmail params 
        var params = {
          Destination: { /* required */
            CcAddresses: [
              'jesse.dailing@nationwide.com',
              /* more items */
            ],
            ToAddresses: [
              'jesse.dailing@nationwide.com',
              /* more items */
            ]
          },
          Message: { /* required */
            Body: { /* required */
              Html: {
               Charset: "UTF-8",
               Data: "coordinates of the accident. longitudeInDegrees: 39.968  latitudeInDegrees: -83.003"
              },
              Text: {
               Charset: "UTF-8",
               Data: "coordinates of the accident. longitudeInDegrees: 39.968  latitudeInDegrees: -83.003"
              }
             },
             Subject: {
              Charset: 'UTF-8',
              Data: 'Your Accident Location'
             }
            },
          Source: 'jesse.dailing@gmail.com', /* required */
        };
        
        // Create the promise and SES service object
        var sendPromise = new AWS.SES(SESConfig).sendEmail(params).promise();
        
        // Handle promise's fulfilled/rejected states
        sendPromise.then(
          function(data) {
                console.log(data.MessageId);
          }).catch(
            function(err) {
                console.error(err, err.stack);
        });
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const VehicleIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VehicleIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Note and take pictures of damage to all involved vehicles. Have this information available when you report the accident to Nationwide.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('How can we assist you further?')
            .getResponse();
    }
};
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const { lastResponse } = sessionAttributes;
        const speakOutput = lastResponse;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const saveResponseForRepeatingInterceptor = {
    process(handlerInput) {
        const response = handlerInput.responseBuilder.getResponse().outputSpeech.ssml;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.lastResponse = response;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Here are some phrases I understand: What should I do, File a claim, Someone is injured, Can I get Roadside Assistance, Talk to an associate, My car is damaged, Exchange Information, and Email me my accident location';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'How can we assist you further?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ClaimIntentHandler,
        InjuredIntentHandler,
        NoobIntentHandler,
        FallbackIntentHandler,
        OtherPersonIntentHandler,
        AssociateIntentHandler,
        TowIntentHandler,
        AddressIntentHandler,
        VehicleIntentHandler,
        RepeatIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addResponseInterceptors(
        saveResponseForRepeatingInterceptor,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
