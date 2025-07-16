// ���m�i�N���X�Ƃ��ĕ\���j

// �_�~�[��UI�v�f�\��
class UIElement {
    constructor(name = "") {
        this.name = name;
    }

    display(value) {
        console.log(`[${this.name}] �\��: ${value}`);
    }

    click() {
        console.log(`[${this.name}] ���N���b�N����܂����B`);
    }
}

class ���o���L�^ {
    constructor(���t, �^�C�v, ���z) {
        this.���t = ���t;
        this.�^�C�v = �^�C�v; // "����" �܂��� "�o��"
        this.���z = ���z;
    }

    toString() {
        return `���t: ${this.���t.toLocaleDateString()}, �^�C�v: ${this.�^�C�v}, ���z: ${this.���z.toFixed(2)}`;
    }
}

class �R�����g {
    constructor(���b�Z�[�W) {
        this.���b�Z�[�W = ���b�Z�[�W;
    }

    �\��() {
        console.log(`�R�����g: ${this.���b�Z�[�W}`);
    }
}

class �z�[�� {
    constructor() {
        this.�c���\���G���A = new UIElement("�c���\��");
        this.�ڕW���z�\���G���A = new UIElement("�ڕW���z�\��");
        this.���o���{�^�� = new UIElement("���o���{�^��");
        this.���̓{�^�� = new UIElement("���̓{�^��");
    }

    �f�[�^�\��(�c��, �ڕW���z) {
        this.�c���\���G���A.display(�c��.toFixed(2));
        this.�ڕW���z�\���G���A.display(�ڕW���z.toFixed(2));
    }

    ���o���{�^�����N���b�N() {
        this.���o���{�^��.click();
    }

    ���̓{�^�����N���b�N() {
        this.���̓{�^��.click();
    }
}

class �{�^�� {
    constructor(name, action) {
        this.name = name;
        this._action = action;
    }

    �N���b�N() {
        console.log(`'${this.name}' �{�^�����N���b�N����܂����B`);
        this._action();
    }
}


// �o��l���i�N���X�Ƃ��ĕ\���j

class �L�����N�^�[ {
    constructor(�C�� = "����") {
        this.�C�� = �C��;
    }

    �R�����g���o��(�c��, �ڕW���z) {
        let message;
        if (�c�� >= �ڕW���z) {
            message = "�f���炵���I�ڕW�B���ł��I";
            this.�C�� = "������";
        } else { // �ڕW�z��������Ă���ꍇ
            message = "�撣��ǂ���ł��B�x�o���������Ă݂܂��傤�B";
            this.�C�� = "�߂���";
        }
        new �R�����g(`${this.�C��}�F${message} (�c��: ${�c��.toFixed(2)}, �ڕW: ${�ڕW���z.toFixed(2)})`).�\��();
    }
}

class �v���O���� {
    constructor() {
        this.�c�� = 0.00; // JavaScript�ł�Number�^�Ő��l������
        this.���o���f�[�^ = [];
        this.�ڕW���z = 0.00;
        this.�L�����N�^�[ = new �L�����N�^�[();
        this.�z�[�� = new �z�[��();
    }

    // �v���O�����͖ڕW���z���c���Ɠ����Ƀz�[���ɏo�͂���B
    �c���ƖڕW�z���z�[���ɏo��() {
        console.log("\n--- �z�[����ʍX�V ---");
        this.�z�[��.�f�[�^�\��(this.�c��, this.�ڕW���z);
        // �c�����ϓ��������A�L�����N�^�[�͂������ݒ肵���ڕW�z�����c����������Ă�����߂����R�����g���A�����Ă�����������R�����g����ʂɏo�͂���B
        this.�L�����N�^�[.�R�����g���o��(this.�c��, this.�ڕW���z);
        console.log("--------------------");
    }

    // ���p�҂͏o���y�ѓ����̋��z����͂��邱�Ƃ��ł��A�������o���ł���Ύc��=�c���[���͂����l�A�����ł���Ύc��=�c��+���͂����l�Ƃ���B
    �c�����X�V(�^�C�v, ���z) {
        const parsed���z = parseFloat(���z); // ������𐔒l�ɕϊ�
        if (isNaN(parsed���z) || parsed���z <= 0) {
            console.error("�G���[: �����ȋ��z�ł��B���̐��l����͂��Ă��������B");
            return;
        }

        if (�^�C�v === "����") {
            this.�c�� += parsed���z;
        } else if (�^�C�v === "�o��") {
            this.�c�� -= parsed���z;
        } else {
            console.error("�G���[: �s���ȃ^�C�v�ł� (����/�o��)�B");
            return;
        }

        this.���o���f�[�^.push(new ���o���L�^(new Date(), �^�C�v, parsed���z));
        console.log(`${�^�C�v} ${parsed���z.toFixed(2)}�~���L�^����܂����B���݂̎c��: ${this.�c��.toFixed(2)}`);
        this.�c���ƖڕW�z���z�[���ɏo��(); // �c���ϓ����ɃR�����g���X�V
    }

    // �v���O�����͌������Ƃ̎c����܂���O���t�Ő�������B
    �����c����܂���O���t�Ő���() {
        console.log("\n--- �����c���̐܂���O���t (�_�~�[) ---");
        // ���ۂɂ͂����ŃO���t�`�惉�C�u�����iChart.js�Ȃǁj���g�p
        const monthlyBalances = {};
        let currentBalance = 0; // �e���̊J�n�c�����g���b�L���O���邽�߂̕ϐ�

        // ���o���f�[�^����t���Ƀ\�[�g�i�K�v�ł���΁j
        const sortedData = [...this.���o���f�[�^].sort((a, b) => a.���t.getTime() - b.���t.getTime());

        for (const record of sortedData) {
            const monthYear = record.���t.getFullYear() + "-" + (record.���t.getMonth() + 1).toString().padStart(2, '0');

            // �e�g�����U�N�V���������̌��̎c���ɂǂ��e�����邩��ǐ�
            if (record.�^�C�v === "����") {
                currentBalance += record.���z;
            } else if (record.�^�C�v === "�o��") {
                currentBalance -= record.���z;
            }
            monthlyBalances[monthYear] = currentBalance; // ���̎��_�ł̎c�����L�^
        }

        const sortedMonths = Object.keys(monthlyBalances).sort();
        for (const month of sortedMonths) {
            console.log(` ${month}: ${monthlyBalances[month].toFixed(2)}�~`);
        }
        console.log("------------------------------");
    }
}

class ���p�� {
    constructor(�v���O����) {
        this.�v���O���� = �v���O����;
    }

    // ���p�҂͖ڕW���z��ݒ肷�邱�Ƃ��ł���B
    �ݒ�() {
        console.log("\n--- ���p�Ґݒ� ---");
        while (true) {
            const �ڕW�zStr = prompt("�ڕW���z��ݒ肵�Ă�������: ");
            const �ڕW�z = parseFloat(�ڕW�zStr);
            if (!isNaN(�ڕW�z) && �ڕW�z >= 0) {
                this.�v���O����.�ڕW���z = �ڕW�z;
                console.log(`�ڕW���z�� ${this.�v���O����.�ڕW���z.toFixed(2)}�~�ɐݒ肳��܂����B`);
                break;
            } else {
                alert("�����ȋ��z�ł��B0�ȏ�̐��l����͂��Ă��������B");
            }
        }
        this.�v���O����.�c���ƖڕW�z���z�[���ɏo��(); // �ݒ����R�����g���X�V
    }

    ���o���z�����(���z) {
        let �^�C�v;
        while (true) {
            �^�C�v = prompt("�����ł����A�o���ł����H (����/�o��): ").trim();
            if (�^�C�v === "����" || �^�C�v === "�o��") {
                break;
            } else {
                alert("�����ȃ^�C�v�ł��B�u�����v�܂��́u�o���v�Ɠ��͂��Ă��������B");
            }
        }
        this.�v���O����.�c�����X�V(�^�C�v, ���z);
    }

    // ���p�҂͎c������Ɋm�F�ł���B�i����́u�c���ƖڕW�z���z�[���ɏo�́v�ŊԐړI�ɒB������܂��j
    // �܂��A�ʓr�����I�Ɋm�F����@�\���������܂�
    �c�����m�F() {
        console.log(`���݂̎c��: ${this.�v���O����.�c��.toFixed(2)}�~`);
    }

    // ���p�҂̓{�^�����z�[�����牟�����Ƃł��̕��͂����邱�Ƃ��o����B
    ���͂�����() {
        console.log("\n--- ���p�ҕ��� ---");
        this.�v���O����.�����c����܂���O���t�Ő���();
        console.log("���o������:");
        if (this.�v���O����.���o���f�[�^.length === 0) {
            console.log("����������܂���B");
        } else {
            this.�v���O����.���o���f�[�^.forEach(record => {
                console.log(` - ${record.toString()}`);
            });
        }
        console.log("--------------------");
    }
}


// --- �V�~�����[�V���� ---
function runSimulation() {
    const myProgram = new �v���O����();
    const user = new ���p��(myProgram);

    console.log("=== �ƌv��A�v�� �V�~�����[�V�����J�n ===");

    // ���[�U�[���ݒ���s��
    user.�ݒ�();

    // ���o���̓��̓V�~�����[�V����
    // prompt�͓����I�ɓ��삷�邽�߁A�A�����ČĂяo���Ă���肠��܂���
    user.���o���z�����(50000); // ����������
    user.���o���z�����(10000); // �H��o��
    user.���o���z�����(3000);  // ��ʔ�o��
    user.���o���z�����(20000); // ������������

    // �z�[����ʂ̓��o���{�^�����N���b�N����V�~�����[�V����
    const ���o���{�^��_�A�N�V���� = () => console.log("���o�����͉�ʂɑJ�ڂ��܂��B�i���̃V�~�����[�V�����ł͒��ړ��o���z����͂��܂��j");
    const �z�[��_���o���{�^�� = new �{�^��("���o��", ���o���{�^��_�A�N�V����);
    �z�[��_���o���{�^��.�N���b�N();
    user.���o���z�����(5000); // ����ɏo��

    // ���͂�����
    // �v�����v�g�̓V�~�����[�V�����̓r���ŋ��܂Ȃ������ǂ��̂ŁA�Ō�ɂ܂Ƃ߂Ď��s�𑣂�
    user.���͂�����();

    // �ڕW���z�̍Đݒ�i�ݒ�֐����ė��p�j
    console.log("\n--- �ڕW���z�̍Đݒ� ---");
    user.�ݒ�(); // �ēxprompt���Ăяo���ĖڕW���z���Đݒ�

    // �ēx����
    user.���͂�����();

    console.log("\n=== �V�~�����[�V�����I�� ===");
}

// �u���E�U�̃R���\�[���Ŏ��s����ꍇ
// runSimulation();

// Node.js���Ŏ��s����ꍇ (prompt���G�~�����[�g���邽��readline-sync�Ȃǂ̃��C�u�������K�v)
// ���̃R�[�h��Node.js�Ŏ��s����ɂ́A`prompt`�֐���`readline-sync`�̂悤�ȃ��C�u�����Œu��������K�v������܂��B
// ��: npm install readline-sync
/*
const readlineSync = require('readline-sync');
function prompt(message) {
    return readlineSync.question(message);
}
function alert(message) {
    console.log(message);
}
*/
// Node.js�Ŏ��s����ꍇ�́A��L��prompt/alert�G�~�����[�V������L���ɂ��āArunSimulation()���Ăяo���Ă��������B

// �ȒP��Node.js�ł̎��s�̂��߂̏����i��L�R�����g�A�E�g������L���ɂ��邩�A�ȉ����Q�l�ɂ��Ă��������j
if (typeof window === 'undefined') { // Node.js��������
    const readlineSync = require('readline-sync');
    global.prompt = readlineSync.question;
    global.alert = console.log;
}

runSimulation();