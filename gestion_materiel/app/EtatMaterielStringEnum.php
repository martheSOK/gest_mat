<?php

namespace App;



class EtatMaterielStringEnum {
    const PRESENT_FONCTIONNEL="PRESENT_FONCTIONNEL";

    public static function toString() {
        return [
            self::PRESENT_FONCTIONNEL,
        ];

    }

}
