SynthDef(\test1, {
	Out.ar(0,SinOsc.ar(200));
}).store;

SynthDef(\test2, {
	Out.ar(0,SinOsc.ar(500));
}).store;

SynthDef(\test3, {
	Out.ar(0,SinOsc.ar(600));
}).store;

SynthDef(\test4, {
	Out.ar(0,SinOsc.ar(900));
}).store;

SynthDef(\test5, {
	Out.ar(0,SinOsc.ar(1200));
}).store;
