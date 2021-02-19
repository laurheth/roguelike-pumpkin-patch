/** Setup parameters for the event manager */
export interface EventManagerParams {
    type?:"simple"|"complex";
    cyclic?:boolean;
}

export interface Actor {
    act:()=>Promise<any>|void;
}

export interface ManagedEvent {
    repeats?:boolean|number;
    delay?:number;
    callback?:()=>Promise<any>|void;
    actor?:Actor;
}

export interface QueuedEvent {
    event: ManagedEvent;
    time:number;
}