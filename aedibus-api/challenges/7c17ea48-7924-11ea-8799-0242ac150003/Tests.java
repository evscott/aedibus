package challenges;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Tests {

    @Test
    public void testHelloWorld() {
        assertEquals("hello world", Attempt.getHelloWorld());
    }

    @Test
    public void testNumber10() {
        assertEquals(11, Attempt.getNumber10());
    }

}
