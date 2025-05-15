import { observableSelf } from '@/async/observableSelf.ts';

interface ModifyOrder<T> {
    userId: string;
    userName: string;
    modifyOrder: Array<T>;
}

async function main() {
    console.clear();
    console.log('\x1b[3m\x1b[90m%s\x1b[0m', 'Console was cleared');
    observableSelf();

    const aa = {
        userId: 'P000001',
        userName: '임현석',
        modifyOrder: [
            {
                orderId: '24G -000002',
                nglisTumorPercent: 71,
                oncoDiagnosisCodeId: 'P-DCD-12',
            },
        ],
    };
}

main().then((r) => r);
