import { CentralShapes } from "../types";
import { QPersistence } from "./QPersistence";

export class ClientHandler {
    queue               : QPersistence;
    inflightOpKey       : string;
    uuidKey             : string;

    constructor() {
        this.queue          = new QPersistence();
        this.inflightOpKey  = "inflightOp";
        this.uuidKey        = "uuid"
    }

    getLocalConflictId(): string | null {
        return localStorage.getItem(this.inflightOpKey);
    }

    storeLocalConflictId(conflictId: string): void {
        localStorage.setItem(this.inflightOpKey, conflictId);
    }

    removeLocalConflictId(): void {
        localStorage.removeItem(this.inflightOpKey);
    }

    getUuid(): string | null {
        return localStorage.getItem(this.uuidKey);
    }

    storeUuid(uuid: string): void {
        localStorage.setItem(this.uuidKey, uuid);
    }

    removeUuid(): void {
        localStorage.removeItem(this.uuidKey);
    }

    async handleIncomingOp(op: CentralShapes.AckOperations): Promise<CentralShapes.AckOperations | null> {
        const storedUuid = this.getUuid();
        console.log("stored uuid: ", storedUuid);
        if (storedUuid) {
            if (op.uuId === storedUuid) {
                console.log("Incoming packet treated as Inflight local");
                return await this.handleInflightOp(op)
                    .then((op) => op);

            } else {
                console.log("Incoming packet treated as remote");
                return await this.handleRemoteOp(op)
                    .then((op) => op);
            }

        } else {
            this.storeUuid(op.uuId);
            return op;
        }
    }

    // Just as we receive new remote op. Here, we perform conflictId lookup
    async handleRemoteOp(remoteOp: CentralShapes.AckOperations): Promise<CentralShapes.AckOperations | null> {
        const inflightId = this.getLocalConflictId();
        
        if (inflightId === null) {
            return remoteOp;

        } else if (inflightId === remoteOp.conflictId) {
            return await this.queue.enqueueOp(remoteOp).then((response) => {
                return null;

            }).catch((err) => {
                throw new Error(err);
            });

        } else {
            return remoteOp;
        }
    };

    // Just as we receive back our own inflight op. Here, we perform resolver logic against our queue.
    async handleInflightOp(inflightOp: CentralShapes.AckOperations): Promise<CentralShapes.AckOperations> {
        return await this.queue.resolveInflightOp(inflightOp).then((op) => {
            this.removeLocalConflictId();
            return op;
        })
    }
}

/**
 * Define:
 * - the Operations: SET_X, CREATE_X, DELETE_X
 * - SET_X, where X is the attribute of the object being modified
 * - can we recognise the operations just by looking at the object?
 * - How do you accommodate adding new features, or 'object properties', into objects?
 * - do we merge them into the state without having to look into the individual fields? how granular do we want them to be?
 */